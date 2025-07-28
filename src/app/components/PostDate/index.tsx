import { dateDistanceToNow, dateformated } from "@/utils";

type Props = {
    dateTime: string;
};

export function PostDate({ dateTime }: Props) {
    return (
        <time
            dateTime={dateTime}
            className="text-slate-600 text-sm/tight"
            title={dateDistanceToNow(dateTime)}
        >
            {dateformated(dateTime)}
        </time>
    );
}
