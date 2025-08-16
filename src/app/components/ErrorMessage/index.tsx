"use client";

import { WifiOff } from "lucide-react";
import Link from "next/link";

type Props = {
    pageTitle?: string;
    contentTitle: string;
    content: React.ReactNode;
    textButton?: string;
    hiddenIconWifi?: boolean;
};

export function ErrorMessage({
    pageTitle = "",
    contentTitle,
    content,
    textButton,
    hiddenIconWifi = false,
}: Props) {
    return (
        <>
            {pageTitle && <title>{pageTitle}</title>}
            <div className="min-h[320px p-8 mb-16 rounded-2xl w-full flex items-center justify-items-center text-center h-[calc(100vh-320px)]">
                <div>
                    <p className=" flex font-medium mb-8 flex-col items-center gap-5">
                        {hiddenIconWifi && (
                            <WifiOff color="#505050" size={100} />
                        )}
                        <span className="text-5xl mb-4 font-extrabold">
                            {contentTitle}
                        </span>
                        {content}
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href={"/"}
                            className="p-3 bg-slate-800 text-slate-50 rounded-2xl flex w-36 justify-center items-center"
                        >
                            {textButton ?? "Voltar"}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
