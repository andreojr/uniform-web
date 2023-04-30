import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { CircleNotch } from "@phosphor-icons/react";
import { colors } from "../components/Shirts";
import logo from "../assets/UniForm.svg";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { precoUnitario } from "./Cadastro";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface Request {
    id: string;
    modelo: "classica" | "alternativa";
    tamanho: string;
    cor: string;
    pay: boolean;
}

export function Requests() {

    const [requests, setRequests] = useState<Array<Request> | null>(null);
    const [cash, setCash] = useState<number | null>(null);

    useEffect(() => {
        api.get("/requests").then(response => {
            setRequests(response.data);
        });
    }, []);

    useEffect(() => {
        if (requests) {
            let tempCash = 0;
            requests.forEach(request => {
                if (request.pay) tempCash = tempCash + precoUnitario;
            });

            setCash(tempCash);
        }
    }, [requests]);

    const modelos = ["classica", "alternativa"];
    const tamanhos = ["P", "M", "G", "GG"];
    const cores = ["preta", "cinza", "branca", "verde", "azul", "azul_claro", "vermelha", "vinho"];

    return (requests && cash !== null) ? (
        <ScrollArea.Root className="!static w-full h-full overflow-hidden flex justify-center">
            <ScrollArea.Viewport className="w-full h-full pb-16">
                <div className="flex flex-col gap-16 pt-12">
                    <Link className="flex flex-col" to="/">
                        <img src={logo} alt="UniForm" className="h-7" />
                    </Link>
                    <div className="flex flex-col gap-10">
                        <div className="flex items-center justify-between gap-8">
                            <div className="flex flex-col">
                                <h1 className="text-white flex gap-1 items-end">
                                    <span className="text-white font-black text-3xl">{cash/precoUnitario}</span>
                                    <span className="text-zinc-400 font-normal text-lg">/{requests.length}</span>
                                    <span className="text-violet-600 font-black text-2xl">Solicitações</span>
                                </h1>
                                <div className="text-white font-bold text-base flex items-end gap-1">
                                    <span className="text-green-500 text-base">R$ {cash}<span className="text-sm">,00</span></span>
                                    <span className="text-zinc-400 text-sm">/ R$ {requests.length * precoUnitario}<span className="text-xs">,00</span></span>
                                </div>
                                <div className="text-white font-bold text-xs flex items-end gap-1 mt-1">
                                    <span>Frete:</span>
                                    <span className="text-yellow-600">R$ {((cash/precoUnitario) * 0.68).toFixed(2).replace(".", ",")}</span>
                                    <span className="text-zinc-400">/ R$ 52,20</span>
                                </div>
                            </div>
                            <CircularProgressbar value={(cash / (requests.length * precoUnitario)) * 100} text={`${Math.round((cash / (requests.length * precoUnitario)) * 100)}%`} className="w-[5rem] h-[5rem] font-black" styles={buildStyles({
                                textColor: '#fff',
                                textSize: '1.5rem',
                                pathColor: '#7c3aed',
                                trailColor: '#3f3f46',
                            })} />
                        </div>
                        <div className="w-full flex flex-col gap-10">
                            {modelos.map(modelo => {
                                return (
                                    <div key={modelo} className="flex flex-col gap-5">
                                        <p className="text-white text-2xl font-black">{modelo === "classica" ? "Clássica" : "Alternativa"}</p>
                                        <div className="flex flex-wrap w-[20rem] gap-6">
                                            {tamanhos.map(tam => {
                                                let countTam = 0;
                                                return (
                                                    <div key={tam} className="w-[9.25rem] bg-zinc-700 rounded-md flex flex-col gap-1">
                                                        <div className="order-2 w-full p-2">
                                                            <div className="grid grid-flow-row grid-cols-3 gap-2">
                                                                {cores.map(cor => {
                                                                    let bg;
                                                                    let count = 0;
                                                                    colors.forEach(color => {
                                                                        if (color.color === cor) bg = color.bg;
                                                                    });

                                                                    requests.forEach(request => {
                                                                        console.log(request);
                                                                        if (request.modelo === modelo && request.tamanho === tam && request.cor === cor) count++;
                                                                    });

                                                                    countTam = countTam + count;

                                                                    return count > 0 && (
                                                                        <div key={cor} className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-white`}>
                                                                            <div className=""></div>
                                                                            <span className={clsx("font-bold", {
                                                                                "text-black": cor === "branca",
                                                                            })}>{count}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                        <p className="order-1 text-white text-xl font-black bg-violet-600 w-full rounded-md text-center">{tam} <span className="text-sm">[{countTam}]</span></p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar orientation="horizontal">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
        </ScrollArea.Root>
    ) : <div className="flex items-center justify-center"><CircleNotch className="animate-spin text-white" size={32} /></div>;
}