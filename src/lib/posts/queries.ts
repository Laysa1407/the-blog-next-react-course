import { postRepository } from "@/repositories/post";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicPosts = cache(
    async () => await postRepository.findAllPublic()
);

export const findAPostBySlug = cache(async (slug: string) => {
    const post = await postRepository
        .findBySlugPublic(slug)
        .catch(() => undefined);

    if (!post) notFound();

    return post;
});

export const findAPostById = cache(
    async (id: string) => await postRepository.findById(id)
);
