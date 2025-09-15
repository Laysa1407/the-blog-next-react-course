type PropsPreviewImage = {
    urlImg: string;
    altImg: string;
    label?: string;
};

export function PreviewImage({ urlImg, label }: PropsPreviewImage) {
    return (
        <div className="w-200px h-300px bg-slate-900 flex justify-center group overflow-hidden rounded-2xl">
            {label && <label>{label}</label>}
            {/*eslint-disable-next-line*/}
            <img
                src={urlImg}
                className="max-w-full h-[200px] block hover:bg-red-300 group hover:cursor-pointer hover:scale-105"
            ></img>
        </div>
    );
}
