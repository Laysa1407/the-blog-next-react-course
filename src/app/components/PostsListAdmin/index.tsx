import { findAllPostsByAdmin } from "@/lib/queries/admin";
import { PostModel } from "@/models/post/post-model";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default async function PostsListAdmin() {
    const posts = await findAllPostsByAdmin();

    return (
        <div className="mb-16 ">
            <h1>Admin Post Page</h1>
            {posts.map((post: PostModel) => {
                return (
                    <div
                        className={clsx(
                            "py-2 px-2 flex gap-5 justify-between",
                            !post.published && "bg-gray-100"
                        )}
                        key={post.id}
                    >
                        <Link href={`/admin/post/${post.id}`} key={post.id}>
                            {post.title}
                        </Link>
                        {!post.published && (
                            <div className="flex">
                                <span className="flex items-center font-normal text-slate-600 italic text-xs">
                                    (Não publicado)
                                </span>
                            </div>
                        )}
                        <button
                            className={clsx(
                                "text-red-500 cursor-pointer transition",
                                "[&>svg]:w-4 [&>svg]:h-4",
                                "hover:scale-120 hover:text-red-700"
                            )}
                            aria-label="Apagar post "
                            title="Apagar post"
                        >
                            <Trash2 />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
