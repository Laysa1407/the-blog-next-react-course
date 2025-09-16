import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repositorie";
import { drizzleDb } from "@/app/db/drizzle";
import { postsTable } from "@/app/db/drizzle/schemas";
import { styleLog } from "@/utils/log-color";
import { eq } from "drizzle-orm";

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

    async create(post: PostModel): Promise<PostModel> {
        const postExists = await drizzleDb.query.posts.findFirst({
            where: (posts, { or, eq }) =>
                or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
        });

        if (!!postExists) {
            throw new Error("Post já existe na base de dados");
        }

        await drizzleDb.insert(postsTable).values(post);

        return post;
    }

    async delete(id: string): Promise<PostModel> {
        const postExists = await drizzleDb.query.posts.findFirst({
            where: (post) => eq(post.id, id),
        });

        if (!postExists) {
            throw new Error("Post não existe");
        }
        await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

        return postExists;
    }

    async update(
        id: string,
        newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">
    ): Promise<PostModel> {
        const postExists = await drizzleDb.query.posts.findFirst({
            where: (post) => eq(post.id, id),
        });

        if (!postExists) {
            throw new Error("Post não existe");
        }

        const updatedAt = new Date().toISOString();
        const postData = {
            author: newPostData.author,
            content: newPostData.content,
            coverImageUrl: newPostData.coverImageUrl,
            excerpt: newPostData.excerpt,
            published: newPostData.published,
            title: newPostData.title,
            updatedAt,
        };

        await drizzleDb
            .update(postsTable)
            .set(postData)
            .where(eq(postsTable.id, id));

        return {
            ...postExists,
            ...postData,
        };
    }
}
