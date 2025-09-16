"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "../Input";
import { InputCheckBox } from "../InputCheckBox";
import { Button } from "../Button";
import { MarkdownEditor } from "../MarckDowEditor/indext";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { updatePostAction } from "@/actions/post/update-post-action";
import { toast } from "react-toastify";
import { createPostAction } from "@/actions/post/create-post-action copy";
import { useRouter, useSearchParams } from "next/navigation";

type ManagerPostFormUpdateProps = {
    mode: "update";
    publicPost: PublicPost;
};

type ManagerPostFormCreateProps = {
    mode: "create";
};

type ManagerPostFormProps =
    | ManagerPostFormCreateProps
    | ManagerPostFormUpdateProps;

export function ManagerPostForm(props: ManagerPostFormProps) {
    const { mode } = props;
    const searchParams = useSearchParams();
    const created = searchParams.get("created");
    const router = useRouter();

    let publicPost;
    if (mode === "update") {
        publicPost = props.publicPost;
    }

    const actionsMap = {
        update: updatePostAction,
        create: createPostAction,
    };
    const initialState = {
        formState: makePartialPublicPost(publicPost),
        errors: [],
    };

    const [state, action, isPending] = useActionState(
        actionsMap[mode],
        initialState
    );

    const { formState } = state;

    const [content, setContent] = React.useState<string>(
        formState?.content || ""
    );

    useEffect(() => {
        if (state.errors.length > 0) {
            toast.dismiss();
            state.errors.forEach((erro) => toast.error(erro));
        }
    }, [state.errors]);

    useEffect(() => {
        if (state.success) {
            toast.dismiss();
            toast.success("Post Atualizado com sucesso!");
        }
    }, [state]);

    useEffect(() => {
        if (created === "1") {
            toast.dismiss();
            toast.success("Post Atualizado com sucesso!");
            const url = new URL(window.location.href);
            url.searchParams.delete("created");
            router.replace(url.toString());
        }
    }, [created, router]);

    return (
        <form action={action}>
            <div>
                <div className="p-2 text-2xl gap-4 flex flex-col">
                    <Input
                        labelText={"ID"}
                        name={"id"}
                        placeholder="ID gerado automáticamente"
                        type="text"
                        defaultValue={formState.id || ""}
                        readOnly
                    />

                    <Input
                        labelText={"Slug"}
                        name="slug"
                        placeholder="Slug gerado automáticamente"
                        type="text"
                        defaultValue={formState.slug || ""}
                        readOnly
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
                        textAreaName="content"
                        value={content}
                        setValue={setContent}
                        disabled={isPending}
                    />

                    <ImageUploader disabled={isPending} />

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
