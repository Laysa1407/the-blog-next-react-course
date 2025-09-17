"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "../Input";
import { CircleUserRound, LogInIcon } from "lucide-react";
import { Button } from "../Button";
import { loginAction } from "@/actions/login/login-action";
import { toast } from "react-toastify";
import clsx from "clsx";

export default function FormLogin() {
    const initialState = {
        userName: "",
        error: "",
    };
    const [state, action, isPending] = useActionState(
        loginAction,
        initialState
    );

    useEffect(() => {
        if (state.error) {
            toast.dismiss();
            toast.error(state.error);
        }
    }, [state]);

    return (
        <div
            className={clsx(
                "flex items-center justify-center",
                "text-center max-w-sm mt-16 mb-32 mx-auto"
            )}
        >
            <form action={action} className="flex-1 flex flex-col gap-6">
                <div className="w-full flex items-center justify-center">
                    <CircleUserRound size={104}></CircleUserRound>
                </div>

                <Input
                    type="text"
                    name="userName"
                    labelText="Usuário"
                    placeholder="Seu usuário"
                    disabled={isPending}
                    defaultValue={state.userName}
                />

                <Input
                    type="password"
                    name="password"
                    labelText="Senha"
                    placeholder="Sua senha"
                    disabled={isPending}
                />

                <Button disabled={isPending} type="submit" className="mt-4">
                    <LogInIcon />
                    Entrar
                </Button>

                {!!state.error && (
                    <p className="text-[#f26780] font-semibold text-sm">
                        {state.error}
                    </p>
                )}
            </form>
        </div>
    );
}
