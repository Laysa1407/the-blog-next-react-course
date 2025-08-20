import { ManagerPostForm } from "@/app/components/ManagerPostForm";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
    return (
        <>
            <h1>Criar Post</h1>
            <ManagerPostForm />
        </>
    );
}
