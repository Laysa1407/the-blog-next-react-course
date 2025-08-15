export const dynamic = "force-dynamic";

type AdminPostIdPage = {
    params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({ params }: AdminPostIdPage) {
    const { id } = await params;
    return (
        <div className="py-16 text-2xl">
            <h1>AdminPostIdPage - id{id}</h1>
        </div>
    );
}
