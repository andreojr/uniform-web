import { ArrowFatRight } from "@phosphor-icons/react";
import logo from "../assets/UniForm.svg";
import art from "../assets/camisa_frente.png";
import { Colors } from "../components/Colors";
import { Input } from "../components/Input";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useState } from "react";
import { api } from "../lib/api";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface UserDataProps {
    nome: string;
    matricula: string;
    curso: string;
    tamanho: string;
    quantidade: string;
}
const defaultUserData = {
    nome: "",
    matricula: "",
    curso: "engcomp",
    tamanho: "",
    quantidade: "1",
};

export interface ShirtProps {
    cor: string;
}

const precoUnitario = 27;

export function Cadastro() {
    const [userData, setUserData] = useState<UserDataProps>(defaultUserData);
    const [shirts, setShirts] = useState<Array<ShirtProps>>([]);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleRequest(e: React.MouseEvent) {
        e.preventDefault();

        console.log(userData);
        console.log(shirts);

        try {
            await api.post("/requests", {...userData, shirts});
            setUserData(defaultUserData);
            setError(false);

            navigate("/cadastro-finalizado");
        } catch(err) {
            setError(true);
        }
    }

    return (
        <div className="pt-20 flex flex-col items-center gap-16">
            <div className="flex flex-col">
                <img src={logo} alt="UniForm" className="h-10" />
            </div>
            <ScrollArea.Root className="!static h-full overflow-hidden">
                <ScrollArea.Viewport className="w-full h-full pb-16">
                    <form className="flex flex-col justify-center gap-12 h-full">
                        <div className="flex flex-col justify-center gap-3">
                            <p className="text-white font-black text-2xl">Cadastro</p>
                            <Input
                                placeholder="Seu nome"
                                value={userData.nome}
                                onChange={e => setUserData({...userData, nome: e.target.value})}
                            />
                            <Input
                                placeholder="Sua matrícula"
                                value={userData.matricula}
                                onChange={e => setUserData({...userData, matricula: e.target.value})}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="text-white font-black text-md">Curso</p>
                                <ToggleGroup.Root type="single" aria-label="Curso" className="flex justify-between gap-5" value={userData.curso}>
                                    <ToggleGroup.Item disabled className="bg-zinc-700 w-full px-3 py-2 rounded-md flex items-center data-[state=on]:bg-violet-600 transition-colors" value={userData.curso} aria-label={userData.curso}>
                                        <span className="font-black text-white">Engenharia da Computação</span>
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-8">
                            <div className="flex flex-col gap-5">
                                <p className="text-white font-black text-2xl">Pedido</p>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-full h-72 overflow-hidden rounded-md">
                                        <div
                                            className="bg-black w-full h-full rounded-md hover:scale-150 transition-transform"
                                            style={{
                                                backgroundImage: `url(${art})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                    </div>
                                    <div className="flex w-full h-8 justify-between items-center">
                                        <ToggleGroup.Root
                                            type="single"
                                            aria-label="Quantidade"
                                            className="flex gap-2"
                                            value={userData.quantidade}
                                            onValueChange={quantidade => setUserData({...userData, quantidade})}
                                        >
                                            <ToggleGroup.Item className="bg-zinc-700 w-8 h-8 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="1" aria-label="1">
                                                <span className="font-black text-white">1</span>
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item className="bg-zinc-700 w-8 h-8 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="2" aria-label="2">
                                                <span className="font-black text-white">2</span>
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item className="bg-zinc-700 w-8 h-8 rounded-md flex items-center justify-center data-[state=on]:bg-violet-600 transition-colors" value="3" aria-label="3">
                                                <span className="font-black text-white">3</span>
                                            </ToggleGroup.Item>
                                        </ToggleGroup.Root>
                                        <p className="text-white text-sm">TOTAL: <span className="font-black text-green-500">R$ {Number(userData.quantidade) * precoUnitario},00</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-white font-black text-md">Tamanho</p>
                                <ToggleGroup.Root
                                    type="single"
                                    aria-label="Tamanho"
                                    className="flex justify-between gap-5"
                                    value={userData.tamanho}
                                    onValueChange={tamanho => setUserData({...userData, tamanho})}
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
                                </ToggleGroup.Root>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-white font-black text-md">Cor</p>
                                <Colors shirtsData={shirts} setShirts={setShirts} quantidade={Number(userData.quantidade)} />
                            </div>
                        </div>

                        <button type="submit" onClick={handleRequest} className={clsx("w-full rounded-md flex items-center justify-center py-2 transition-colors", {
                            "bg-red-500 hover:bg-red-400": error,
                            "bg-violet-600 hover:bg-violet-600": !error,
                        })}>
                            <ArrowFatRight className="text-white" size={24} weight="fill" />
                        </button>
                    </form>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
            </ScrollArea.Root>
        </div>
    );
}