import clsx from "clsx";

type Props = {
    constentStyles?: string;
    loadingClasses?: string;
};

export default async function CircularProgress({
    constentStyles,
    loadingClasses,
}: Props) {
    return (
        <div
            className={clsx(
                "flex items-center justify-center h-9",
                constentStyles
            )}
        >
            <div
                className={clsx(
                    "w-10 h-10 border-5 border-t-transparent border-blue-900 rounded-full animate-spin",
                    loadingClasses
                )}
            ></div>
        </div>
    );
}
