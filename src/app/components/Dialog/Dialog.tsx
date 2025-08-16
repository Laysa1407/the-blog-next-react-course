import clsx from "clsx";
import { CircleX } from "lucide-react";
import React from "react";

type DialogProps = {
    open: boolean;
    title: string;
    content: React.ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    disabled: boolean;
};

const Dialog = ({
    title,
    content,
    open = false,
    onClose,
    onConfirm,
    disabled,
}: DialogProps) => {
    if (!open) return null;

    function handleClose() {
        if (disabled) return;
        onClose();
    }

    return (
        <div
            className={clsx(
                "fixed z-50 inset-0 bg-black/55 backdrop-blur-xs",
                "flex items-center justify-center"
            )}
            onClick={handleClose}
        >
            <div
                className="bg-slate-100 p-6 m-1.5 rounded-lg max-w-2xl mx-6 gap-6 shadow-lg shadow-black/30"
                role="dialog"
                aria-modal={true}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="group flex items-center justify-between rounded-full">
                    <h3 id={"dialog-title"} className="text-bold text-2xl p-2">
                        {title}
                    </h3>
                    <CircleX
                        className="cursor-pointer hover:scale-105 transition-colors"
                        color="#db394f"
                        size={28}
                        onClick={handleClose}
                    />
                </div>
                <div
                    id={"dialog-content"}
                    className="p-2 text-[#505050] text-justify"
                >
                    {content}
                </div>
                <div className="flex w-full justify-between gap-5">
                    <button
                        className={clsx(
                            " bg-slate-300 p-2 min-w-40 rounded-2xl cursor-pointer",
                            " hover:bg-slate-400 transition text-slate-950",
                            "flex items-center justify-center",
                            "py-2 hover:scale-105",
                            "disabled: cursor-not-allowed",
                            "disabled:bg-slate-200 disabled:text-slate-400"
                        )}
                        onClick={handleClose}
                        disabled={disabled}
                    >
                        Cancelar
                    </button>
                    <button
                        className={clsx(
                            " bg-blue-500 p-2 min-w-40 rounded-2xl cursor-pointer",
                            " hover:bg-blue-600 transition text-slate-950",
                            "flex items-center justify-center",
                            "py-2 text-white hover:scale-105",
                            "disabled: cursor-not-allowed",
                            "disabled:bg-slate-200 disabled:text-slate-400"
                        )}
                        onClick={onConfirm}
                        disabled={disabled}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
