import clsx from "clsx";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
    url: string;
    as?: "h1" | "h2";
};

export function PostHeading({ children, url, as: Tag = "h1" }: Props) {
    const classes = {
        h1: "text-2xl/tight font-extrabold sm:text-4xl",
        h2: "text-2xl/tight font-bold",
    };

    return (
        <Tag className={clsx(classes[Tag])}>
            <Link className="hover:text-amber-950" href={url}>
                {children}
            </Link>
        </Tag>
    );
}
