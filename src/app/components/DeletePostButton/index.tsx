"use client";
import { deletePostAction } from "@/actions/post/delete-post-action";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import Dialog from "../Dialog/Dialog";

type ButtonProps = {
    id: string;
};

export function DeletePostButton({ id }: ButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [openDialog, setOpenDialog] = useState(false);

    function handleClick() {
        setOpenDialog(true);
    }

    function handleClickConfirm() {
        if (!confirm("Tem certeza que deseja apagar este post?")) return;
        startTransition(async () => {
            const result = await deletePostAction(id);

            setOpenDialog(false);

            if (result.error) {
                alert(`Erro: ${result.error}`);
            }
        });
    }

    return (
        <div>
            <button
                className={clsx(
                    "text-red-500 cursor-pointer transition",
                    "[&>svg]:w-4 [&>svg]:h-4",
                    "hover:scale-120 hover:text-red-700",
                    "disabled:text-slate-600 disabled:cursor-not-allowed"
                )}
                aria-label="Apagar post "
                title="Apagar post"
                onClick={handleClick}
                disabled={isPending}
            >
                <Trash2 />
            </button>
            {openDialog && (
                <Dialog
                    open={openDialog}
                    title={"Tem certeza?"}
                    content={"Tem certeza que deseja apagar este post?"}
                    onClose={() => setOpenDialog(false)}
                    onConfirm={handleClickConfirm}
                    disabled={isPending}
                />
            )}
        </div>
    );
}
