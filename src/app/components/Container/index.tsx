type Props = {
    children: React.ReactNode;
};

export function Container({ children }: Props) {
    return (
        <div
            className={
                " text-xl font-bold text-slate-900 min-h-screen min-w-screen flex"
            }
        >
            <div className="bg-slate-200 max-w-screen min-w-screen-lg mx-auto px-8">
                {children}
            </div>
        </div>
    );
}
