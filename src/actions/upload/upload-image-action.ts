"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { File } from "buffer";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type UploadImageActionResult = {
    url: string;
    error: string;
};

const MAX_SIZE_IMAGE = 921600;

const urlServer = process.env.IMAGE_SERVER_URL as string;

export async function uploadImageAction(
    formData: FormData
): Promise<UploadImageActionResult> {
    const makeResult = ({ url = "", error = "" }) => ({ url, error });

    const isAuthenticated = await verifyLoginSession();

    if (!isAuthenticated) {
        return makeResult({ error: "Usuário não autenticado!" });
    }

    if (!(formData instanceof FormData)) {
        return makeResult({ error: "Dados Invalidos" });
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
        return makeResult({ error: "Arquivo inválido!" });
    }

    if (file.size > MAX_SIZE_IMAGE) {
        return makeResult({ error: "Arquivo muito grande!" });
    }

    if (!file.type.startsWith("image/")) {
        return makeResult({ error: "Imagem invalido!" });
    }

    const imageExtension = extname(file.name);
    const uniqueImageName = `${Date.now()}${imageExtension}`;
    const directory = process.env.IMAGE_UPLOAD_DIRECTORY as string;

    const uploadFullPath = resolve(process.cwd(), "public", directory);
    await mkdir(uploadFullPath, { recursive: true });

    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    const fileFullpath = resolve(uploadFullPath, uniqueImageName);

    await writeFile(fileFullpath, buffer);

    const url = `${urlServer}/${uniqueImageName}`;

    return makeResult({ url: url });
}
