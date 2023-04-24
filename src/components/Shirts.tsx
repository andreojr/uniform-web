import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ItemColor } from "./ItemColor";
import { ShirtProps } from "../pages/Cadastro";
import { useEffect, useState } from "react";
import clsx from "clsx";

// Colors Preview
    // model Código
        import camisa_codigo_preta from "../assets/camisa_codigo_preta.png";
        import camisa_codigo_preta_verso from "../assets/camisa_codigo_preta_verso.png";

        import camisa_codigo_branca from "../assets/camisa_codigo_branca.png";
        import camisa_codigo_branca_verso from "../assets/camisa_codigo_branca_verso.png";

        import camisa_codigo_vermelha from "../assets/camisa_codigo_vermelha.png";
        import camisa_codigo_vermelha_verso from "../assets/camisa_codigo_vermelha_verso.png";

        import camisa_codigo_azul from "../assets/camisa_codigo_azul.png";
        import camisa_codigo_azul_verso from "../assets/camisa_codigo_azul_verso.png";

        import camisa_codigo_verde from "../assets/camisa_codigo_verde.png";
        import camisa_codigo_verde_verso from "../assets/camisa_codigo_verde_verso.png";

export const colors = [
    {
        color: "Preto",
        bg: "bg-black",
        preview: camisa_codigo_preta,
        previewVerse: camisa_codigo_preta_verso,
        verse: false,
    },
    {
        color: "Branco",
        bg: "bg-white",
        preview: camisa_codigo_branca,
        previewVerse: camisa_codigo_branca_verso,
        verse: false,
    },
    {
        color: "Vinho",
        bg: "bg-red-600",
        preview: camisa_codigo_vermelha,
        previewVerse: camisa_codigo_vermelha_verso,
        verse: false,
    },
    {
        color: "Verde",
        bg: "bg-green-600",
        preview: camisa_codigo_verde,
        previewVerse: camisa_codigo_verde_verso,
        verse: false,
    },
    {
        color: "Azul",
        bg: "bg-blue-600",
        preview: camisa_codigo_azul,
        previewVerse: camisa_codigo_azul_verso,
        verse: false,
    },
];

interface ShirtsProps {
    customShirts: Array<ShirtProps>;
    setCustomShirts: React.Dispatch<React.SetStateAction<Array<ShirtProps>>>;
    quantidade: number;
}

export function Shirts({ customShirts, setCustomShirts, quantidade }: ShirtsProps) {

    useEffect(() => {
        const updateMany = [];
        const voidModel = customShirts[0];
        for (let q = 0; q < quantidade; q++) {
            updateMany.push(voidModel);
        }
        setCustomShirts(updateMany);
    }, [quantidade]);

    return (
        <div className="flex flex-col gap-10">
            {customShirts.map((customShirt, i) => (
                <div key={JSON.stringify(customShirt)+"-"+i} className="flex flex-col gap-5">
                    <p className={clsx("text-white font-black text-md", {
                        "hidden": quantidade === 1,
                    })}>Camisa {i+1}</p>
                    <div className="w-full h-72 overflow-hidden rounded-md">
                        {
                        !customShirt.cor
                        ?
                            <div className="bg-zinc-700 w-[17rem] h-full rounded-md flex items-center justify-center">
                                <p className="text-white text-lg w-3/4 text-center">Escolha uma cor para pré-visualização...</p>
                            </div>
                        :
                            
                            <div
                                onClick={() => {
                                    const updateCustomShirts = [...customShirts];
                                    const updateCustomShirt = { ...customShirt };
                                    if (updateCustomShirt.cor) {    
                                        if (updateCustomShirt.cor.verse) {
                                            updateCustomShirt.cor.verse = false;
                                            updateCustomShirts.splice(i, 1, updateCustomShirt);
                                        } else {
                                            updateCustomShirt.cor.verse = true;
                                            updateCustomShirts.splice(i, 1, updateCustomShirt);
                                        }
                                    }
                                    setCustomShirts(updateCustomShirts);
                                }}
                                className="bg-zinc-700 w-full h-full rounded-md cursor-pointer flex items-end"
                                style={{
                                    backgroundImage: `url(${customShirt.cor.verse ? customShirt.cor.previewVerse : customShirt.cor.preview})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ><p className="w-full bg-violet-600 text-white text-sm p-2 text-center">Clique para ver {customShirt.cor.verse ? "a frente" : "o verso"}...</p></div>       
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-black text-md">Tamanho</p>
                        <ToggleGroup.Root
                            type="single"
                            aria-label="Tamanho"
                            className="flex justify-between gap-5"
                            value={customShirt.tamanho}
                            onValueChange={tamanho => {
                                const updateCustomShirt = [...customShirts];
                                updateCustomShirt.splice(i, 1, { ...customShirt, tamanho });
                                setCustomShirts(updateCustomShirt);
                            }}
                        >
                            <ToggleGroup.Item className="bg-zinc-700 w-1/3 py-2 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="P" aria-label="P">
                                <span className="font-black text-white">P</span>
                            </ToggleGroup.Item>
                            <ToggleGroup.Item className="bg-zinc-700 w-1/3 py-2 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="M" aria-label="M">
                                <span className="font-black text-white">M</span>
                            </ToggleGroup.Item>
                            <ToggleGroup.Item className="bg-zinc-700 w-1/3 py-2 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="G" aria-label="G">
                                <span className="font-black text-white">G</span>
                            </ToggleGroup.Item>
                            <ToggleGroup.Item className="bg-zinc-700 w-1/3 py-2 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="GG" aria-label="GG">
                                <span className="font-black text-white">GG</span>
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    <ToggleGroup.Root
                        type="single"
                        aria-label="Cor"
                        className="grid grid-flow-col grid-rows-2 gap-3"
                        value={JSON.stringify(customShirt.cor)}
                        onValueChange={cor => {
                            const updateCustomShirt = [...customShirts];
                            updateCustomShirt.splice(i, 1, { ...customShirt, cor: JSON.parse(cor) });
                            setCustomShirts(updateCustomShirt);
                        }}
                    >
                        {colors.map(color => {
                            return (
                                <ItemColor key={color.bg} color={color} selectedColor={customShirt.cor?.color} />
                            );
                        })}
                    </ToggleGroup.Root>
                </div>
            ))}
        </div>
    );
}