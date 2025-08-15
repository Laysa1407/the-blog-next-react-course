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

        console.log("post", post);

        if (!post) throw new Error("Post não encontrado");

        return post;
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        styleLog("findAllBySlugPublic");

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq, and }) =>
                and(eq(posts.published, true), eq(posts.slug, slug)),
        });

        console.log("post", post);

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

(async () => {
    "    9eb8b7ac-2b48-4835-880a-a1c798e1a595 true";
    "6b204dab-2312-4525-820a-a0463560835f false";

    //     organizacao-pessoal-por-onde-comecar true
    // 10-habitos-para-aumentar-sua-produtividade false

    const repo = new DrizzlePostRepository();
    // const posts = await repo.findAllPublic();
    const post = await repo.findBySlugPublic(
        "10-habitos-para-aumentar-sua-produtividade"
    );
    console.log(post);
    // posts.forEach((post) => console.log(post.slug, post.published));
})();
