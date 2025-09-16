import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPosts } from "@/lib/queries/public";

export async function PostFeatured() {
    const posts = await findAllPublicPosts();

    if (posts.length <= 0) return null;

    const postDestaque = posts[0];

    return (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group items-baseline">
            <PostCoverImage
                linkProps={{ href: `/post/${postDestaque.slug}` }}
                imageProps={{
                    width: 1200,
                    height: 720,
                    src: postDestaque.coverImageUrl,
                    alt: postDestaque.title,
                }}
            />

            <PostSummary
                createdAt={postDestaque.createdAt}
                excerpt={postDestaque.excerpt}
                title={postDestaque.title}
                key={postDestaque.id}
                postHeading={"h2"}
                postLink={`/post/${postDestaque.slug}`}
            />
        </section>
    );
}
