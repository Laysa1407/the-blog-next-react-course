import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repositorie";
import { drizzleDb } from "@/app/db/drizzle";
import { postsTable } from "@/app/db/drizzle/schemas";

export class DrizzlePostRepository implements PostRepository {
    async findAllPublic(): Promise<PostModel[]> {
        const posts = drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(postsTable.createdAt),
            where: (posts, { eq }) => eq(posts.published, true),
        });

        return posts;
    }

    async findById(id: string): Promise<PostModel> {}

    async findBySlugPublic(slug: string): Promise<PostModel> {}

    async findAll(): Promise<PostModel[]> {}
}

(async () => {
    const repo = new DrizzlePostRepository();
    const posts = await repo.findAllPublic();

    posts.forEach((post) => console.log(post.author, post.published));
})();
