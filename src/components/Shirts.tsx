import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ItemColor } from "./ItemColor";
import { ShirtProps } from "../pages/Cadastro";
import { useEffect, useState } from "react";
import clsx from "clsx";

import classica_preta from "../assets/classica/preta.png";
import classica_branca from "../assets/classica/branca.png";
import classica_verde from "../assets/classica/verde.png";
import classica_azul from "../assets/classica/azul.png";
import classica_vinho from "../assets/classica/vinho.png";
import classica_vermelha from "../assets/classica/vermelha.png";
import classica_azul_claro from "../assets/classica/azul_claro.png";
import classica_cinza from "../assets/classica/cinza.png";


import alternativa_preta from "../assets/alternativa/preta.png";
import alternativa_branca from "../assets/alternativa/branca.png";
import alternativa_verde from "../assets/alternativa/verde.png";
import alternativa_azul from "../assets/alternativa/azul.png";
import alternativa_vinho from "../assets/alternativa/vinho.png";

import alternativa_preta_verso from "../assets/alternativa/preta_verso.png";
import alternativa_branca_verso from "../assets/alternativa/branca_verso.png";
import alternativa_verde_verso from "../assets/alternativa/verde_verso.png";
import alternativa_azul_verso from "../assets/alternativa/azul_verso.png";
import alternativa_vinho_verso from "../assets/alternativa/vinho_verso.png";

export interface Color {
    color: string;
    bg: string;
    classica: string;
    alternativa: string;
    alternativaVerse: string;
    verse: boolean;
};

export const colors: Array<Color> = [
    {
        color: "preta",
        bg: "bg-black",
        classica: classica_preta,
        alternativa: alternativa_preta,
        alternativaVerse: alternativa_preta_verso,
        verse: false,
    },
    {
        color: "verde",
        bg: "bg-green-600",
        classica: classica_verde,
        alternativa: alternativa_verde,
        alternativaVerse: alternativa_verde_verso,
        verse: false,
    },
    {
        color: "vinho",
        bg: "bg-red-900",
        classica: classica_vinho,
        alternativa: alternativa_vinho,
        alternativaVerse: alternativa_vinho_verso,
        verse: false,
    },
    {
        color: "vermelha",
        bg: "bg-red-600",
        classica: classica_vermelha,
        alternativa: alternativa_vinho,
        alternativaVerse: alternativa_vinho_verso,
        verse: false,
    },
    {
        color: "azul",
        bg: "bg-blue-900",
        classica: classica_azul,
        alternativa: alternativa_azul,
        alternativaVerse: alternativa_azul_verso,
        verse: false,
    },
    {
        color: "azul_claro",
        bg: "bg-blue-400",
        classica: classica_azul_claro,
        alternativa: alternativa_azul,
        alternativaVerse: alternativa_azul_verso,
        verse: false,
    },
    {
        color: "branca",
        bg: "bg-white",
        classica: classica_branca,
        alternativa: alternativa_branca,
        alternativaVerse: alternativa_branca_verso,
        verse: false,
    },
    {
        color: "cinza",
        bg: "bg-zinc-400",
        classica: classica_cinza,
        alternativa: alternativa_branca,
        alternativaVerse: alternativa_branca_verso,
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
                            <div className="bg-zinc-700 w-full h-full rounded-md flex items-center justify-center">
                                <p className="text-white text-base w-3/4 text-center">Personalize para<br />pré-visualização...</p>
                            </div>
                        :
                            
                            <div
                                onClick={() => {
                                    if (customShirt.modelo === "alternativa") {
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
                                    }
                                }}
                                className="bg-zinc-700 w-full h-full rounded-md cursor-pointer flex items-end"
                                style={{
                                    backgroundImage: `url(${customShirt.cor.verse ? customShirt.cor.alternativaVerse : customShirt.cor[customShirt.modelo]})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                {customShirt.modelo === "alternativa" && <p className="w-full bg-violet-600 text-white text-sm p-2 text-center">Clique para ver {customShirt.cor.verse ? "a frente" : "o verso"}...</p>}
                            </div>       
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-black text-md">Modelo</p>
                        <ToggleGroup.Root
                            type="single"
                            aria-label="Modelo"
                            className="flex justify-between gap-5"
                            value={customShirt.modelo}
                            onValueChange={(modelo: "classica" | "alternativa") => {
                                const updateCustomShirt = [...customShirts];
                                updateCustomShirt.splice(i, 1, { ...customShirt, modelo });
                                setCustomShirts(updateCustomShirt);
                            }}
                        >
                            <ToggleGroup.Item className="bg-zinc-700 w-1/2 py-2 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="classica" aria-label="classica">
                                <span className="font-black text-white">Clássica</span>
                            </ToggleGroup.Item>
                            <ToggleGroup.Item className="bg-zinc-700 w-1/2 py-2 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="alternativa" aria-label="alternativa">
                                <span className="font-black text-white">Alternativa</span>
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
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
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-black text-md">Cor</p>
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
                </div>
            ))}
        </div>
    );
}