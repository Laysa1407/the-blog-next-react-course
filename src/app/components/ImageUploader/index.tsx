"use client";

import { ImageUp } from "lucide-react";
import React, { useEffect, useRef, useTransition } from "react";
import { Button } from "../Button";
import { toast } from "react-toastify";
import { PreviewImage } from "../PreviewImage";
import { uploadImageAction } from "@/actions/upload/upload-image-action";

const MAX_SIZE_IMAGE = 921600;

export function ImageUploader() {
    const ref = useRef<HTMLInputElement>(null);
    const [image, setImage] = React.useState<string>("");

    const [isPending, startTransition] = useTransition();

    function handleClickOpen() {
        if (ref.current) {
            ref?.current.click();
        }
    }

    function handleChange() {
        toast.dismiss();

        if (!ref.current) return;

        const fileInput = ref.current;
        const file = fileInput?.files?.[0];

        if (!file) return;
        if (file.size > MAX_SIZE_IMAGE) {
            toast.error("Esta imagem é muito grande. Max. 900kb");
            fileInput.value = "";
            return;
        }

        setImage(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);

        startTransition(async () => {
            const result = await uploadImageAction(formData);
            if (result.error) {
                toast.error(result.error);
                fileInput.value = "";
                return;
            }

            toast.success(result.url);
        });

        fileInput.value = "";
    }

    return (
        <div className="flex py-4 flex-col gap-2.5">
            <Button
                type="button"
                className="self-start"
                onClick={handleClickOpen}
            >
                <ImageUp />
                Enviar imagem
            </Button>
            {image && (
                <div>
                    <PreviewImage urlImg={image} altImg="imagem" />
                </div>
            )}
            <input
                className="hidden"
                name="file"
                type="file"
                accept="image/*"
                ref={ref}
                onChange={handleChange}
            ></input>
        </div>
    );
}
