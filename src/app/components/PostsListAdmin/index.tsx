import { findAllPostsByAdmin } from "@/lib/queries/admin";
import { PostModel } from "@/models/post/post-model";
import clsx from "clsx";
import Link from "next/link";
import { DeletePostButton } from "../DeletePostButton";
import { ErrorMessage } from "../ErrorMessage";

export default async function PostsListAdmin() {
    const posts = await findAllPostsByAdmin();

    if (posts.length <= 0) {
        return (
            <ErrorMessage
                contentTitle={"Ei"}
                content={"Voce ainda não tem nenhum post criado!"}
            ></ErrorMessage>
        );
    }

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
                        <DeletePostButton id={post.id} />
                    </div>
                );
            })}
        </div>
    );
}
