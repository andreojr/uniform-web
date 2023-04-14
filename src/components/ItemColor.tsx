import { Check } from "@phosphor-icons/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";

interface ItemColorProps {
    color: string;
    bg: string;
}

export function ItemColor({ color, bg }: ItemColorProps) {
    return (
        <ToggleGroup.Item className="group relative" value={color} aria-label={color}>
            <div className={clsx("group-data-[state=on]:flex hidden w-full h-full absolute rounded-md items-center justify-center")}>
                <div className={`flex items-center justify-center w-5 h-5 rounded-full ${bg}`}>
                    <Check
                        size={24}
                        className={clsx("", { "text-white": bg !== "bg-white", "text-black": bg === "bg-white" })} weight="bold"
                    />
                </div>
            </div>
            <div className={`w-full h-10 ${bg} rounded-md`} />
        </ToggleGroup.Item>
    );
}