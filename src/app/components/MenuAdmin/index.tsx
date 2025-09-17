"use client";
import logoutAction from "@/actions/login/logout-action";
import clsx from "clsx";
import {
    CircleX,
    FileText,
    Hourglass,
    HouseIcon,
    LogOutIcon,
    Menu,
    PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

export function MenuAdmin() {
    const [menuOpen, setOpenMenu] = useState(false);
    const pathName = usePathname();
    const [isPending, startTransitional] = useTransition();

    useEffect(() => {
        setOpenMenu(false);
    }, [pathName]);

    const navClasses = clsx(
        "bg-slate-900 text-slate-100 rounded-lg flex flex-col mb-8",
        "sm:flex-row sm:flex-wrap",
        !menuOpen && "h-10 overflow-hidden",
        "sm:overflow-visible sm:h-auto"
    );
    const linkClasses = clsx(
        "[&>svg]:w-4 [&>svg]:h-4 px-4 flex items-center",
        "transition hover:bg-slate-800 gap-2 hover:rounded-lg",
        "h-10 shrink-0"
    );

    const buttonMenu = clsx(linkClasses, "text-blue-200 italic sm:hidden");

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        startTransitional(async () => {
            await logoutAction();
        });
    };

    return (
        <nav className={navClasses}>
            <button
                onClick={() => setOpenMenu((prev) => !prev)}
                className={buttonMenu}
            >
                {!menuOpen ? <Menu /> : <CircleX />}
                Menu
            </button>
            <a className={linkClasses} href="/" target="_blank">
                <HouseIcon />
                Home
            </a>
            <Link className={linkClasses} href={"/admin/post"}>
                <FileText />
                Post
            </Link>
            <Link className={linkClasses} href={"/admin/post/new"}>
                <PlusIcon />
                Criar post
            </Link>
            <a onClick={handleLogout} href="" className={linkClasses}>
                <>
                    {isPending && (
                        <>
                            <Hourglass />
                            Saindo...
                        </>
                    )}
                </>
                {!isPending && (
                    <>
                        <LogOutIcon />
                        Sair
                    </>
                )}
            </a>
        </nav>
    );
}
