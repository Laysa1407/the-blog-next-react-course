import { ErrorMessage } from "../ErrorMessage";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPosts } from "@/lib/queries/public";

export async function PostList() {
    const posts = await findAllPublicPosts();

    if (posts.length <= 1)
        return (
            <ErrorMessage
                contentTitle="Ops!"
                content={"Não há posts para mostrar!"}
            />
        );

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-baseline mb-16">
            {posts.slice(1).map((post) => {
                return (
                    <div className=" flex flex-col gap-4 group" key={post.id}>
                        <PostCoverImage
                            linkProps={{ href: `/post/${post.slug}` }}
                            imageProps={{
                                width: 1200,
                                height: 720,
                                src: post.coverImageUrl,
                                alt: post.title,
                            }}
                        />
                        <PostSummary
                            createdAt={post.createdAt}
                            excerpt={post.excerpt}
                            title={post.title}
                            key={post.id}
                            postHeading={"h2"}
                            postLink={`/post/${post.slug}`}
                        />
                    </div>
                );
            })}
        </div>
    );
}
