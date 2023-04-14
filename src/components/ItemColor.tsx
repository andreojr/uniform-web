import { Check } from "@phosphor-icons/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface ItemColorProps {
    color: string;
    bg: string;
}

export function ItemColor({ color, bg }: ItemColorProps) {
    return (
        <ToggleGroup.Item className="group relative" value={color} aria-label={color}>
            <div className="group-data-[state=on]:flex hidden bg-white w-full h-full absolute rounded-md items-center justify-center">
                <div className={`flex items-center justify-center w-5 h-5 rounded-full ${bg}`}><Check size={12} className="text-white" weight="bold" /></div>
            </div>
            <div className={`w-full h-10 border-4 border-transparent ${bg} rounded-md`} />
        </ToggleGroup.Item>
    );
}