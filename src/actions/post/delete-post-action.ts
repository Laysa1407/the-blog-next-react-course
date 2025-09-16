"use server";

import { drizzleDb } from "@/app/db/drizzle";
import { postsTable } from "@/app/db/drizzle/schemas";
import { postRepository } from "@/repositories/post";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
    if (!id || typeof id !== "string") {
        return {
            error: "Dados inválidos",
        };
    }

    const post = await postRepository.findById(id).catch(() => undefined);

    if (!post) {
        return {
            error: "Post não encontrado",
        };
    }

    let postExcluido;

    try {
        postExcluido = await postRepository.delete(id);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                error: error.message,
            };
        }

        return {
            error: "Erro ao deletar post",
        };
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
    revalidateTag("posts");
    revalidatePath(`post-${postExcluido.slug}`);

    return {
        error: "",
    };
}
