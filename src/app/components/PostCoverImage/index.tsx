import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type Props = {
    imageProps: React.ComponentProps<typeof Image>;
    linkProps: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, linkProps }: Props) {
    return (
        <Link
            {...linkProps}
            className={clsx(
                "w-full h-full overflow-hidden rounded-xl",
                linkProps.className
            )}
        >
            <Image
                {...imageProps}
                alt={imageProps?.alt}
                className={clsx(
                    "w-full h-full object-cover group-hover:scale-105 transition",
                    imageProps.className
                )}
                priority
            />
        </Link>
    );
}
