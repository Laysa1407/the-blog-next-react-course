"use server";

import {
    makePartialPublicPost,
    makePublicPostFromDb,
    PublicPost,
} from "@/dto/post/dto";
import { PostCreateSchema } from "@/lib/posts/validations";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";

type updatePostActionState = {
    formState: PublicPost;
    errors: string[];
    success?: true;
};
export async function updatePostAction(
    prevState: updatePostActionState,
    formData: FormData
): Promise<updatePostActionState> {
    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ["Formulário inválido"],
        };
    }

    const id = formData.get("id");

    if (!id || typeof id !== "string") {
        return {
            formState: prevState.formState,
            errors: ["ID inválido"],
        };
    }

    const formDataToObj = Object.fromEntries(formData.entries());
    const zodParsedObject = PostCreateSchema.safeParse(formDataToObj);

    if (!zodParsedObject.success) {
        const errors = getZodErrorMessages(zodParsedObject.error.format());

        return {
            formState: makePartialPublicPost(formDataToObj),
            errors,
        };
    }

    const valIdPostData = zodParsedObject.data;
    const post = {
        ...valIdPostData,
    };

    let postRecuperado;

    try {
        postRecuperado = await postRepository.update(id, post);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                formState: makePartialPublicPost(post),
                errors: [error.message],
            };
        }
        throw new Error("Erro ao criar post");
    }

    revalidateTag("posts");
    revalidateTag(`post-${postRecuperado.slug}`);

    return {
        formState: makePublicPostFromDb(postRecuperado),
        errors: [],
        success: true,
    };
}
