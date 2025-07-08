import clsx from "clsx";
import CircularProgress from "./components/CircularProgress";
import { Suspense } from "react";
import { PostList } from "./components/PostList";

export default function HomePage() {
    return (
        <div className={clsx("text-xl", " font-bold", " text-blue-500")}>
            <header>Header</header>
            <Suspense fallback={<CircularProgress />}>
                <PostList />
            </Suspense>
            <footer>Footer</footer>
        </div>
    );
}
