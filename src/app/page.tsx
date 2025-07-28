import CircularProgress from "./components/CircularProgress";
import { Suspense } from "react";
import { PostList } from "./components/PostList";
import { PostFeatured } from "./components/PostFeatured";

export default function HomePage() {
    return (
        <>
            <Suspense
                fallback={<CircularProgress constentStyles="min-h-20 mb-15" />}
            >
                <PostFeatured />
                <PostList />
            </Suspense>
        </>
    );
}
