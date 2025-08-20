import clsx from "clsx";
import React, { useId } from "react";

type PropsInputCheckBox = {
    labelText?: string;
    type?: "checkbox";
} & React.ComponentProps<"input">;

export function InputCheckBox({
    labelText,
    type = "checkbox",
    ...props
}: PropsInputCheckBox) {
    const id = useId();

    return (
        <div className="flex gap-2 w-full items-center">
            <div className="flex h-full gap-3 items-center ">
                <input
                    {...props}
                    className={clsx(
                        "flex h-8 w-4 transition-colors checked:bg-slate-900 checked:text-amber-50",
                        props.className
                    )}
                    id={id}
                    type={type}
                />
                {labelText && (
                    <label
                        htmlFor={id}
                        className={"flex text-[#505050] font-medium text-sm "}
                    >
                        {labelText}
                    </label>
                )}
            </div>
        </div>
    );
}
