"use client";
import React from "react";
import { Input } from "../Input";
import { InputCheckBox } from "../InputCheckBox";
import { Button } from "../Button";
import { MarkdownEditor } from "../MarckDowEditor/indext";
import { ImageUploader } from "../ImageUploader";

export function ManagerPostForm() {
    const [content, setContent] = React.useState<string>("Este é *m* exmplo");

    return (
        <form action="">
            <div>
                <div className="p-2 text-2xl gap-4 flex flex-col">
                    <Input labelText={"Nome"} placeholder="Digite seu nome" />
                    <Input
                        labelText={"Sobrenome"}
                        placeholder="Digite seu nome"
                    />
                    <ImageUploader />
                    <InputCheckBox labelText="Ativo" />
                    <MarkdownEditor
                        labelText="Conteúdo"
                        disabled={false}
                        textAreaName="content"
                        value={content}
                        setValue={setContent}
                    ></MarkdownEditor>
                </div>
                <div>
                    <Button variant="default" size="md">
                        Salvar
                    </Button>
                </div>
            </div>
        </form>
    );
}
