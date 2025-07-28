import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
    const jsonPostRepository = new JsonPostRepository();
    const posts = await jsonPostRepository.findAll();

    try {
        await drizzleDb.delete(postsTable); // ISSO LIMPA A BASE DE DADOS
        await drizzleDb.insert(postsTable).values(posts);
    } catch (e) {
        console.log("OCORREU UM ERRO", e);
    }
})();
