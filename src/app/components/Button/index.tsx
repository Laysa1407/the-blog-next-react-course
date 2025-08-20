import clsx from "clsx";
import React from "react";

type ButtonVariants = "default" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    variant?: ButtonVariants;
    size?: ButtonSize;
} & React.ComponentProps<"button">;

export function Button({
    variant = "default",
    size = "md",
    ...props
}: ButtonProps) {
    const buttonVariants: Record<ButtonVariants, string> = {
        default: clsx("bg-blue-600 text-blue-100 hover:bg-blue-700"),
        ghost: clsx("bg-slate-300 text-slate-900 hover:bg-slate-400"),
        danger: clsx("bg-red-600 text-red-100 hover:bg-red-700"),
    };

    const buttonSizes: Record<ButtonSize, string> = {
        sm: clsx(
            "text-xs/tight py-1 px-2",
            "[&>svg]:w-3 [&>svg]:h-3 gap-1 h-8"
        ),
        md: clsx(
            "text-base/tight py-2 px-4 ",
            "[&>svg]:w-4 [&>svg]:h-4 gap-2 h-10"
        ),
        lg: clsx(
            "text-lg/tight py-4 px-6",
            "[&>svg]:w-5 [&>svg]:h-5 gap-3 h-12"
        ),
    };

    const classes = clsx(
        "rounded-lg font-semibold flex items-center justify-center",
        "flex justify-center cursor-pointer transition",
        "disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
    );

    const classesButon = clsx(
        buttonVariants[variant],
        buttonSizes[size],
        classes,
        props.className
    );

    return <button {...props} className={classesButon} />;
}
