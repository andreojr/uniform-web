import { ArrowFatRight } from "@phosphor-icons/react";
import logo from "../assets/UniForm.svg";
import { Shirts } from "../components/Shirts";
import { Input } from "../components/Input";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useState } from "react";
import { api } from "../lib/api";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

interface UserDataProps {
    nome: string;
    matricula: string;
    curso: string;
    quantidade: number;
}
const defaultUserData = {
    nome: "",
    matricula: "",
    curso: "engcomp",
    quantidade: 1,
};

export interface ShirtProps {
    tamanho: string;
    cor: {
        color: string;
        bg: string;
        preview: string;
        previewVerse: string;
        verse: boolean;
    } | null;
}

export const precoUnitario = 27;

export function Cadastro() {
    const [userData, setUserData] = useState<UserDataProps>(defaultUserData);
    const [customShirts, setCustomShirts] = useState<Array<ShirtProps>>([{cor:null,tamanho:""}]);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleRequest(e: React.MouseEvent) {
        e.preventDefault();

        try {

            const { nome, matricula, curso } = userData;
            
            const shirts: Array<ShirtProps> = [];
            customShirts.forEach(shirt => {
                if (shirt.cor)
                    shirts.push({tamanho: shirt.tamanho, cor: shirt.cor.color});
            });

            if (shirts.length !== userData.quantidade) {
                setError(true);
                return;
            }

            console.log({ nome, matricula, curso, shirts });
            await api.post("/requests", { nome, matricula, curso, shirts });
            setError(false);
            navigate("/cadastro-finalizado");
        } catch(err) {
            setError(true);
        }
    }

    return (
        <div className="w-full pt-20 flex flex-col items-center gap-16">
            <Link className="flex flex-col" to="/">
                <img src={logo} alt="UniForm" className="h-10" />
            </Link>
            <ScrollArea.Root className="!static w-full h-full overflow-hidden flex justify-center">
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
                                    <ToggleGroup.Item disabled className="bg-zinc-700 w-full px-3 py-2 rounded-md data-[state=on]:bg-violet-600 transition-colors" value={userData.curso} aria-label={userData.curso}>
                                        <span className="font-black text-white">Engenharia da Computação</span>
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-8">
                            <div className="flex flex-col gap-5">
                                <p className="text-white font-black text-2xl">Pedido</p>
                                <div className="flex w-full h-8 justify-between items-center">
                                    <p className="text-base text-white font-black">Quantidade: </p>
                                    <Input type="number" style={{ width: "33%" }} min={1} max={99} value={userData.quantidade} onChange={e => setUserData({...userData, quantidade: Number(e.target.value)})} />
                                </div>
                            </div>
                            <Shirts customShirts={customShirts} setCustomShirts={setCustomShirts} quantidade={userData.quantidade} />
                            <div className="flex justify-between text-base font-black">
                                <span className="text-white">TOTAL:</span><span className="text-green-500">R$ {userData.quantidade * precoUnitario},00</span>
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