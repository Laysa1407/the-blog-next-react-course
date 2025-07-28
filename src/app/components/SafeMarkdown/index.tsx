import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type Props = {
    markdown: string;
};

export function SafeMarkdown({ markdown }: Props) {
    return (
        <div className="prose prose-slate w-full max-w-none overflow-hidden prose-a:text-blue-500 prose-a:hover:text-blue-950 prose-a:transition prose-a:no-underline prose-img:mx-auto lg:prose-lg">
            <ReactMarkdown
                rehypePlugins={[rehypeSanitize]}
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ node, ...props }) => {
                        if (!node?.children) return "";
                        return (
                            <div className="overflow-x-auto p-2 bg-white rounded-xl">
                                <table
                                    className="min-w-[600px] p-4 "
                                    {...props}
                                />
                            </div>
                        );
                    },
                    th: ({ node, ...props }) => {
                        if (!node?.children) return "";

                        return (
                            <th
                                className=" text-center bg-amber-100"
                                {...props}
                            ></th>
                        );
                    },
                    td: ({ node, ...props }) => {
                        if (!node?.children) return "";

                        return (
                            <td
                                className="bg-[#f2f2f2] text-center"
                                {...props}
                            ></td>
                        );
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
