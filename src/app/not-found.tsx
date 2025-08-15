import { WifiOff } from "lucide-react";
import Link from "next/link";

export default function notFoundPage() {
    return (
        <>
            <title>Página não encontrada!</title>
            <div className="min-h[320px p-8 mb-16 rounded-2xl w-full flex items-center justify-items-center text-center h-[calc(100vh-320px)]">
                <div>
                    <p className=" flex font-medium mb-8 flex-col items-center gap-5">
                        <WifiOff color="#505050" size={100} />
                        <span className="text-5xl mb-4 font-extrabold">
                            404
                        </span>
                        Erro 404 - A página que voce está tentando acessar não
                        foi não encontrada!
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href={"/"}
                            className="p-4 bg-slate-800 text-slate-50 rounded-2xl flex w-48 justify-center items-center"
                        >
                            Voltar
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
