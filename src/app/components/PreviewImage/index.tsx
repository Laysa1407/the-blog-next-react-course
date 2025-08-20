type PropsPreviewImage = {
    urlImg: string;
    altImg: string;
};

export function PreviewImage({ urlImg }: PropsPreviewImage) {
    return (
        <div className="bg-slate-500">
            <img src={urlImg} className=""></img>
        </div>
    );
}
