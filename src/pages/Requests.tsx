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
    const cores = ["preta", "branca", "azul", "vinho", "verde", "azul_claro", "vermelha", "cinza"];

    return (requests && cash !== null) ? (
        <ScrollArea.Root className="!static w-full h-full overflow-hidden flex justify-center">
            <ScrollArea.Viewport className="w-full h-full pb-16">
                <div className="flex flex-col gap-16 pt-12">
                    <Link className="flex flex-col" to="/">
                        <img src={logo} alt="UniForm" className="h-7" />
                    </Link>
                    <div className="flex flex-col gap-10">
                        <div className="flex justify-between gap-8">
                            <div className="flex flex-col">
                                <h1 className="text-white text-[1.75rem] font-black"><span className="text-violet-600">{requests.length}</span> Pedidos</h1>
                                <div className="text-white font-bold text-base flex items-end gap-1">
                                    <span className="text-green-500 text-base">R$ {cash}</span>
                                    <span className="text-zinc-400 text-sm">/ R$ {requests.length * precoUnitario},00</span>
                                </div>
                            </div>
                            <CircularProgressbar value={(cash / (requests.length * precoUnitario)) * 100} text={`${Math.round((cash / (requests.length * precoUnitario)) * 100)}%`} className="w-[4.5rem] h-[4.5rem] font-black" styles={buildStyles({
                                textColor: '#fff',
                                textSize: '1.5rem',
                                pathColor: '#7c3aed',
                                trailColor: '#3f3f46',
                            })} />
                        </div>
                        <div className="w-full flex flex-col sm:flex-row gap-10">
                            {modelos.map(modelo => {
                                return (
                                    <div key={modelo} className="w-full sm:w-1/2 flex flex-col gap-5">
                                        <p className="text-white text-2xl font-black">{modelo === "classica" ? "Clássica" : "Alternativa"}</p>
                                        {tamanhos.map(tam => {
                                            return (
                                                <div key={tam} className="w-full bg-zinc-700 rounded-md p-4 flex flex-col gap-2">
                                                    <p className="text-white text-xl font-black">{tam}</p>
                                                    <div className="grid grid-flow-row grid-cols-4 gap-2">
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

                                                            return (
                                                                <div key={cor} className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-white`}>
                                                                    <div className=""></div>
                                                                    <span className={clsx("font-bold", {
                                                                        "text-black": cor === "branca",
                                                                    })}>{count}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
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