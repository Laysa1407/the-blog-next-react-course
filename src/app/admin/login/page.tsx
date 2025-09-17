import { ErrorMessage } from "@/app/components/ErrorMessage";
import FormLogin from "@/app/components/FormLogin";
import { Metadata } from "next";

export const dinamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Login",
};

export default function LoginForm() {
    const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

    if (!allowLogin) {
        return (
            <ErrorMessage
                contentTitle="403"
                content={"Libere o sistema de login usando ALLOW_LOGIN"}
            />
        );
    }

    return <FormLogin />;
}
