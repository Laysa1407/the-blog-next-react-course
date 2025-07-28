import { postRepository } from "@/repositories/post";
import Image from "next/image";
import React from "react";
import { PostHeading } from "../PostHeeading";
import { PostDate } from "../PostDate";
import { SafeMarkdown } from "../SafeMarkdown";

type Props = {
    slug: string;
};

export async function SinglePost({ slug }: Props) {
    const post = await postRepository.findBySlugPublic(slug);

    return (
        <article>
            <header className="group flex flex-col gap-4 mb-4">
                <Image
                    alt={post.title}
                    src={post.coverImageUrl}
                    width={1200}
                    height={720}
                    className="rounded-xl"
                />

                <PostHeading url={`/post/${post.slug}`}>
                    {post.title}
                </PostHeading>
                <p>
                    {post.author} | <PostDate dateTime={post.createdAt} />
                </p>
            </header>
            <p className="mb-4 text-xl text-slate-600">{post.excerpt}</p>
            <SafeMarkdown markdown={post.content} />
        </article>
    );
}
