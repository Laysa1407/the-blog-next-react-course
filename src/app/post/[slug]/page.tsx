import CircularProgress from "@/app/components/CircularProgress";
import { SinglePost } from "@/app/components/SinglePost";
import { findAPostBySlug } from "@/lib/posts/queries";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const post = await findAPostBySlug(slug);
    return {
        title: post?.title,
        description: post.excerpt,
    };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;

    throw new Error("teste");

    return (
        <Suspense
            fallback={<CircularProgress constentStyles="min-h-20 mb-16" />}
        >
            <SinglePost slug={slug} />
        </Suspense>
    );
}
