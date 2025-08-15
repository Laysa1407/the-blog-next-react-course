import CircularProgress from "@/app/components/CircularProgress";
import { SinglePost } from "@/app/components/SinglePost";
import { findPublicPostBySlugCached } from "@/lib/queries/public";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-static";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const post = await findPublicPostBySlugCached(slug);
    return {
        title: post?.title,
        description: post.excerpt,
    };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;

    return (
        <Suspense
            fallback={<CircularProgress constentStyles="min-h-20 mb-16" />}
        >
            <SinglePost slug={slug} />
        </Suspense>
    );
}
