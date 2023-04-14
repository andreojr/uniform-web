import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ItemColor } from "./ItemColor";
import { UserDataProps } from "../pages/Cadastro";

const colors = [
    {
        color: "Preto",
        bg: "bg-black",
    },
    {
        color: "Branco",
        bg: "bg-white",
    },
    {
        color: "Vermelho",
        bg: "bg-red-500",
    },
    {
        color: "Amarelo",
        bg: "bg-yellow-500",
    },
    {
        color: "Verde",
        bg: "bg-green-500",
    },
    {
        color: "Azul",
        bg: "bg-blue-500",
    },
];

interface ColorsProps {
    userData: UserDataProps;
    setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}

export function Colors({ userData, setUserData }: ColorsProps) {

    return (
        <ToggleGroup.Root
            type="single"
            aria-label="Cor"
            className="grid grid-flow-col grid-rows-2 gap-3"
            value={userData.cor}
            onValueChange={cor => setUserData({...userData, cor})}
        >
            {colors.map(color => {
                return (
                    <ItemColor key={color.bg} color={color.color} bg={color.bg} />
                );
            })}
        </ToggleGroup.Root>
    );
}