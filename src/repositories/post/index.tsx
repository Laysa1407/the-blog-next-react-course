import { JsonPostRepository } from "./json-post-repository";
import { PostRepository } from "./post-repositorie";

export const postRepository: PostRepository = new JsonPostRepository();
