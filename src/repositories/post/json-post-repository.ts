import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repositorie";
import { resolve } from "path";
import { readFile } from "fs/promises";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
    ROOT_DIR,
    "src",
    "app",
    "db",
    "seed",
    "posts.json"
);

export class JsonPostRepository implements PostRepository {
    private async readFromDisk(): Promise<PostModel[]> {
        const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf8");
        const parsedJson = JSON.parse(jsonContent);
        const { posts } = parsedJson;
        return posts;
    }

    async findAllPublic(): Promise<PostModel[]> {
        const posts = await this.readFromDisk();
        return posts.filter((post) => post.published);
    }

    async findById(id: string): Promise<PostModel> {
        const posts = await this.findAllPublic();
        const post = posts.find((item) => item.id === id);

        if (!post) throw new Error("post não encontrado!");

        return post;
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        const posts = await this.findAllPublic();
        const post = posts.find((item) => item.slug === slug);

        if (!post) throw new Error("post não encontrado!");

        return post;
    }

    async findAll(): Promise<PostModel[]> {
        const posts = await this.readFromDisk();
        return posts;
    }
}
