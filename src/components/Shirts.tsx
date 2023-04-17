import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ItemColor } from "./ItemColor";
import { ShirtProps } from "../pages/Cadastro";
import { useEffect, useState } from "react";
import clsx from "clsx";

// Modelos
import basico from "../assets/basico.jpg";
import codigo from "../assets/codigo.jpg";

// Colors Preview
import art_black from "../assets/camisa_frente.png";
import art_black_verse from "../assets/camisa_verso.png";

const colors = [
    {
        color: "Preto",
        bg: "bg-black",
        preview: {
            basico: art_black,
            codigo: art_black,
        },
        previewVerse: {
            basico: art_black,
            codigo: art_black,
        },
    },
    {
        color: "Branco",
        bg: "bg-zinc-300",
        preview: {
            basico: art_black,
            codigo: art_black,
        },
        previewVerse: {
            basico: art_black,
            codigo: art_black,
        },
    },
    {
        color: "Vinho",
        bg: "bg-red-600",
        preview: {
            basico: art_black,
            codigo: art_black,
        },
        previewVerse: {
            basico: art_black,
            codigo: art_black,
        },
    },
    {
        color: "Verde",
        bg: "bg-green-600",
        preview: {
            basico: art_black,
            codigo: art_black,
        },
        previewVerse: {
            basico: art_black,
            codigo: art_black,
        },
    },
    {
        color: "Azul",
        bg: "bg-blue-600",
        preview: {
            basico: art_black,
            codigo: art_black,
        },
        previewVerse: {
            basico: art_black,
            codigo: art_black,
        },
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
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-black !text-md">Modelo:</p>
                        <ToggleGroup.Root
                            type="single"
                            aria-label="Modelo"
                            className="flex justify-between text-white font-black gap-5"
                            value={customShirt.modelo}
                            onValueChange={(modelo: "basico" | "codigo") => {
                                const updateCustomShirt = [...customShirts];
                                updateCustomShirt.splice(i, 1, { ...customShirt, modelo });
                                setCustomShirts(updateCustomShirt);
                            }}
                        >
                            <ToggleGroup.Item className=" bg-zinc-700 pb-2 rounded-md flex flex-col gap-2 items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="basico" aria-label="básico">
                                <img src={basico} alt="básico" className="w-[6rem] rounded-tl-md rounded-tr-md" />
                                <p>Básico</p>
                            </ToggleGroup.Item>
                            <ToggleGroup.Item className="bg-zinc-700 pb-2 rounded-md flex flex-col gap-2 items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="codigo" aria-label="código">
                                <img src={codigo} alt="código" className="w-[6rem] rounded-tl-md rounded-tr-md" />
                                <p>Código</p>
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                    <div className="w-full h-72 overflow-hidden rounded-md">
                        {
                        !customShirt.cor
                        ?
                            <div className="bg-black w-[14.5rem] h-full rounded-md flex items-center justify-center">
                                <p className="text-white text-base w-3/4 text-center">Escolha uma cor para pré-visualização</p>
                            </div>
                        :
                            
                            <div
                                onClick={() => {
                                    const updateCustomShirt = [...customShirts];
                                    if (customShirt.previewVerse)
                                        updateCustomShirt.splice(i, 1, { ...customShirt, previewVerse: false });
                                    else
                                        updateCustomShirt.splice(i, 1, { ...customShirt, previewVerse: true });
                                    setCustomShirts(updateCustomShirt);
                                }}
                                className="bg-black w-full h-full rounded-md cursor-pointer flex items-end"
                                style={{
                                    backgroundImage: `url(${customShirt.previewVerse ? customShirt.cor.previewVerse[customShirt.modelo] : customShirt.cor.preview[customShirt.modelo]})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ><p className="w-full bg-violet-600 text-white text-sm p-2 text-center">Clique para ver {customShirt.previewVerse ? "a frente" : "o verso"}...</p></div>       
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
                                <ItemColor key={color.bg} color={color} />
                            );
                        })}
                    </ToggleGroup.Root>
                </div>
            ))}
        </div>
    );
}