import CircularProgress from "@/app/components/CircularProgress";
import PostsListAdmin from "@/app/components/PostsListAdmin";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Post Admin",
};

export default async function AdminPostPage() {
    return (
        <Suspense fallback={<CircularProgress constentStyles="mb-16" />}>
            <PostsListAdmin />
        </Suspense>
    );
}
