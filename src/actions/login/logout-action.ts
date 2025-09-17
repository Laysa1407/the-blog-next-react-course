"use server";

import { deleteLoginSession } from "@/lib/login/manage-login";
import { styleLog } from "@/utils/log-color";
import { redirect } from "next/navigation";

export default async function logoutAction() {
    styleLog("Logout Action", "red");

    await deleteLoginSession();
    redirect("/");
}
