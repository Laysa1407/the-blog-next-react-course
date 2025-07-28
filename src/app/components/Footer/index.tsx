import Link from "next/link";

export function Footer() {
    return (
        <footer className="flex items-center  justify-center h-16">
            <p>
                Copyrigth &copy; {2025} -<Link href={"/"}>The blog</Link>
            </p>
        </footer>
    );
}
