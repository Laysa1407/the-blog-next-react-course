"use server";

import { createLoginSession, verifyPassword } from "@/lib/login/manage-login";
import { redirect } from "next/navigation";

type LoginActionState = {
    userName: string;
    error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
    if (!(formData instanceof FormData)) {
        return {
            userName: "",
            error: "dados inválidos",
        };
    }

    const userName = formData.get("userName")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";

    if (!password || !userName) {
        return {
            userName,
            error: "Preencha todos os campos",
        };
    }

    const isUserNameValid = userName === process.env.LOGIN_USER;
    const isPasswordValid = await verifyPassword(
        password,
        process.env.LOGIN_PASS || ""
    );

    if (!isUserNameValid || !isPasswordValid) {
        return {
            userName,
            error: "Usuário ou senha inválidos",
        };
    }

    await createLoginSession(userName);

    redirect("/admin/post");
}
