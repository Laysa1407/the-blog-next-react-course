import clsx from "clsx";
import React, { useId } from "react";

type PropsInput = {
    labelText?: string;
} & React.ComponentProps<"input">;

export function Input({ labelText, ...props }: PropsInput) {
    const id = useId();

    return (
        <div className="flex flex-col gap-2 w-full items-center justify-center text-start">
            {labelText && (
                <label
                    htmlFor={id}
                    className="text-slate-800 font-medium text-sm w-full pl-1"
                >
                    {labelText}
                </label>
            )}
            <input
                {...props}
                className={clsx(
                    "bg-white w-full rounded-full p-2 px-3 ring-1 ring-[#868686] border-none",
                    "transition focus:outline-none",
                    "focus:ring-2 focus:ring-[#505050]",
                    "placeholder-slate-300",
                    "disabled:bg-[#cccccc] disabled:placeholder-[#868686]",
                    "h-9 text-sm text-[#505050] font-normal",
                    props.className
                )}
                id={id}
            />
        </div>
    );
}
