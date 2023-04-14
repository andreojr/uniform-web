import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ItemColor } from "./ItemColor";
import { ShirtProps } from "../pages/Cadastro";
import { useEffect, useState } from "react";
import clsx from "clsx";

const colors = [
    {
        color: "Preto",
        bg: "bg-black",
    },
    {
        color: "Branco",
        bg: "bg-zinc-300",
    },
    {
        color: "Vinho",
        bg: "bg-red-600",
    },
    {
        color: "Verde",
        bg: "bg-green-600",
    },
    {
        color: "Azul",
        bg: "bg-blue-600",
    },
];

interface ColorsProps {
    shirtsData: Array<ShirtProps>;
    setShirts: React.Dispatch<React.SetStateAction<Array<ShirtProps>>>;
    quantidade: number;
}

export function Colors({ shirtsData, setShirts, quantidade }: ColorsProps) {
    const [color1,setColor1] = useState("");
    const [color2,setColor2] = useState("");
    const [color3,setColor3] = useState("");

    useEffect(() => {
        if (quantidade === 1)
            setShirts([{cor:color1}]);
        if (quantidade === 2)
            setShirts([{cor:color1},{cor:color2}]);
        if (quantidade === 3)
            setShirts([{cor:color1},{cor:color2},{cor:color3}]);
    }, [color1, color2, color3]);

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p className={clsx("text-white mb-1", {
                    "hidden": quantidade === 1,
                })}>Camisa 1</p>
                <ToggleGroup.Root
                    type="single"
                    aria-label="Cor"
                    className="grid grid-flow-col grid-rows-2 gap-3"
                    value={color1}
                    onValueChange={cor => setColor1(cor)}
                >
                    {colors.map(color => {
                        return (
                            <ItemColor key={color.bg} color={color.color} bg={color.bg} />
                        );
                    })}
                </ToggleGroup.Root>
            </div>
            <div className={clsx("", {
                "hidden": quantidade === 1,
            })}>
                <p className="text-white mb-1">Camisa 2</p>
                <ToggleGroup.Root
                    type="single"
                    aria-label="Cor"
                    className="grid grid-flow-col grid-rows-2 gap-3"
                    value={color2}
                    onValueChange={cor => setColor2(cor)}
                >
                    {colors.map(color => {
                        return (
                            <ItemColor key={color.bg} color={color.color} bg={color.bg} />
                        );
                    })}
                </ToggleGroup.Root>
            </div>
            <div className={clsx("", {
                "hidden": quantidade === 1 || quantidade === 2,
            })}>
                <p className="text-white mb-1">Camisa 3</p>
                <ToggleGroup.Root
                    type="single"
                    aria-label="Cor"
                    className="grid grid-flow-col grid-rows-2 gap-3"
                    value={color3}
                    onValueChange={cor => setColor3(cor)}
                >
                    {colors.map(color => {
                        return (
                            <ItemColor key={color.bg} color={color.color} bg={color.bg} />
                        );
                    })}
                </ToggleGroup.Root>
            </div>
        </div>
    );
}