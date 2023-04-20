import { Check } from "@phosphor-icons/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";

interface ItemColorProps {
    color: {
        color: string;
        bg: string;
    };
    selectedColor: string | undefined;
}

export function ItemColor({ color, selectedColor }: ItemColorProps) {
    return (
        <ToggleGroup.Item className="group relative" value={JSON.stringify(color)} aria-label={color.color}>
            <div className={clsx("w-full h-full absolute rounded-md items-center justify-center", {
                "hidden": color.color !== selectedColor,
                "flex": color.color === selectedColor,
            })}>
                <div className={`flex items-center justify-center w-5 h-5 rounded-full ${color.bg}`}>
                    <Check
                        size={24}
                        className={clsx("", { "text-white": color.bg !== "bg-white", "text-black": color.bg === "bg-white" })} weight="bold"
                    />
                </div>
            </div>
            <div className={`w-full h-10 ${color.bg} rounded-md`} />
        </ToggleGroup.Item>
    );
}