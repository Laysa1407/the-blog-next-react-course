import { ManagerPostForm } from "@/app/components/ManagerPostForm";
import { makePublicPostFromDb } from "@/dto/post/dto";
import { findPostByIdAdmin } from "@/lib/queries/admin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Editar Post",
};

type AdminPostIdPage = {
    params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({ params }: AdminPostIdPage) {
    const { id } = await params;
    const post = await findPostByIdAdmin(id).catch();
    if (!post) {
        notFound();
    }

    const postDto = makePublicPostFromDb(post);

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-extrabold">Editar Post</h1>
            <ManagerPostForm postDto={postDto} />
        </div>
    );
}
