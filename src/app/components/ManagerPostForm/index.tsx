"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "../Input";
import { InputCheckBox } from "../InputCheckBox";
import { Button } from "../Button";
import { MarkdownEditor } from "../MarckDowEditor/indext";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/post/create-post-action";
import { toast } from "react-toastify";

type ManagerPostFormProps = {
    postDto: PublicPost;
};

export function ManagerPostForm({ postDto }: ManagerPostFormProps) {
    const initialState = {
        formState: makePartialPublicPost(postDto),
        errors: [],
    };

    const [state, action, isPending] = useActionState(
        createPostAction,
        initialState
    );

    const { formState } = state;
    const [content, setContent] = React.useState<string>(
        formState?.content || ""
    );

    useEffect(() => {
        if (state.errors.length > 0) {
            state.errors.forEach((erro) => toast.error(erro));
        }
    }, [state.errors]);

    return (
        <form action={action}>
            <div>
                <div className="p-2 text-2xl gap-4 flex flex-col">
                    <Input
                        labelText={"ID"}
                        name="id"
                        placeholder="ID gerado automáticamente"
                        type="text"
                        defaultValue={formState.id || ""}
                        disabled={true}
                    />

                    <Input
                        labelText={"Slug"}
                        name="slug"
                        placeholder="Slug gerado automáticamente"
                        type="text"
                        defaultValue={formState.slug || ""}
                        disabled={true}
                    />

                    <Input
                        labelText={"Autor"}
                        name="author"
                        placeholder="Digite o nome do autor"
                        type="text"
                        defaultValue={formState.author || ""}
                        disabled={isPending}
                    />

                    <Input
                        labelText={"Título"}
                        name="title"
                        placeholder="Digite o titulo"
                        type="text"
                        defaultValue={formState.title || ""}
                        disabled={isPending}
                    />

                    <Input
                        labelText={"Excerto"}
                        name="excerpt"
                        placeholder="Digite o resumo"
                        type="text"
                        defaultValue={formState.excerpt || ""}
                        disabled={isPending}
                    />

                    <MarkdownEditor
                        labelText="Conteúdo"
                        disabled={false}
                        textAreaName="content"
                        value={content}
                        setValue={setContent}
                    />

                    <ImageUploader />

                    <Input
                        labelText="Url da imagem de capa"
                        name={"coverImageUrl"}
                        placeholder="Digite a Url da imagem"
                        type="text"
                        defaultValue={formState.coverImageUrl || ""}
                        disabled={isPending}
                    />

                    <InputCheckBox
                        labelText="Deixar público??"
                        name={"published"}
                        type="checkbox"
                        defaultChecked={formState.published}
                        disabled={isPending}
                    />
                </div>
                <div>
                    <Button variant="default" size="md" disabled={isPending}>
                        Salvar
                    </Button>
                </div>
            </div>
        </form>
    );
}
