"use client";
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login";
import { MenuAdmin } from "../components/MenuAdmin";
import { useEffect } from "react";

type AdminPostLayoutProps = {
    children: React.ReactNode;
};

export default function AdminPostLayout({
    children,
}: Readonly<AdminPostLayoutProps>) {
    useEffect(() => {
        verifyAuthentication();
    }, []);

    const verifyAuthentication = async () => {
        await requireLoginSessionOrRedirect();
    };

    return (
        <>
            <MenuAdmin />
            {children}
        </>
    );
}
