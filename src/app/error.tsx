"use client";

import { useEffect } from "react";
import { ErrorMessage } from "./components/ErrorMessage";

type Props = {
    error: Error;
    reset?: () => void;
};

export default function RootErrorPage({ error }: Props) {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <ErrorMessage
            contentTitle="501"
            pageTitle="Internal Server Error"
            content="Ocorreu um erro não tratado!"
        />
    );
}
