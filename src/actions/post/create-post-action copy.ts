"use server";

import { drizzleDb } from "@/app/db/drizzle";
import { postsTable } from "@/app/db/drizzle/schemas";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { PostCreateSchema } from "@/lib/posts/validations";
import { PostModel } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type createPostActionState = {
    formState: PublicPost;
    errors: string[];
    success?: true;
};
export async function createPostAction(
    prevState: createPostActionState,
    formData: FormData
): Promise<createPostActionState> {
    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ["Formulário inválido"],
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
    const post: PostModel = {
        ...valIdPostData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidv4(),
        slug: makeSlugFromText(valIdPostData.title),
    };

    try {
        await postRepository.create(post);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                formState: post,
                errors: [error.message],
            };
        }
        throw new Error("Erro ao criar post");
    }

    await drizzleDb.insert(postsTable).values(post);
    revalidateTag("posts");
    redirect(`/admin/post/${post.id}?created=1`);
}
