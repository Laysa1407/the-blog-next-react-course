import { ManagerPostForm } from "@/app/components/ManagerPostForm";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Criar Post",
};

export default async function AdminNewPostPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-extrabold">Criar Post</h1>
            <ManagerPostForm />
        </div>
    );
}
