import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repositorie";
import { drizzleDb } from "@/app/db/drizzle";
import { postsTable } from "@/app/db/drizzle/schemas";
import { styleLog } from "@/utils/log-color";

export class DrizzlePostRepository implements PostRepository {
    async findAllPublic(): Promise<PostModel[]> {
        styleLog("findAllPublic");
        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(postsTable.createdAt),
            where: (posts, { eq }) => eq(posts.published, true),
        });

        return posts;
    }

    async findById(id: string): Promise<PostModel> {
        styleLog("findById");

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        });

        if (!post) throw new Error("Post não encontrado");

        return post;
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        styleLog("findAllBySlugPublic");

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq, and }) =>
                and(eq(posts.published, true), eq(posts.slug, slug)),
        });

        if (!post) throw new Error("Post não encontrado");

        return post;
    }

    async findAll(): Promise<PostModel[]> {
        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(postsTable.createdAt),
        });

        return posts;
    }
}
