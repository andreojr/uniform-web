import * as ScrollArea from "@radix-ui/react-scroll-area";
import logo from "../assets/UniForm.svg";
import { Link, Navigate } from "react-router-dom";
import clsx from "clsx";
import { ArrowSquareOut, Check, CheckCircle, Circle, CircleNotch, Divide, DotsThree, Gear, Info, Truck, WhatsappLogo, X } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import { Solic } from "./Home";
import { api } from "../lib/api";

export function VisaoGeral() {
    const {user} = useContext(AuthContext);

    const [paid, setPaid] = useState<boolean | null>(null);
    const [mySolic, setMySolic] = useState<Array<Solic> | null>(null);
    const [etapaAtual, setEtapaAtual] = useState<number | null>(null);
    const [conf, setConf] = useState<{confirms: number; total: number}| null>(null);

    useEffect(() => {
        api.get("/etapa-atual").then(response => {
            setEtapaAtual(response.data);
        });
        handleSetMySolics();
        handleSetConfirms();
    }, []);

    function handleSetConfirms() {
        api.get("/users").then(response => {
            let countConfirm = 0;
            response.data.forEach((user: User) => {
                if (user.confirmado) countConfirm++;
            });
            setConf({ confirms: countConfirm, total: response.data.length });
        });
    }

    function handleSetMySolics() {
        if (user) {
            api.get(`/requests/${user.id}`).then(response => {
                setMySolic(response.data.results);
            });
        }
    }

    useEffect(() => {
        if (mySolic) {
            console.log(mySolic);
            let paid = true;
            mySolic.forEach(solic => {
                if (!solic.pay) paid = false;
            });
            setPaid(paid);
            if (etapaAtual && etapaAtual > 2 && !paid) setEtapaAtual(3);
        }
    }, [etapaAtual, mySolic]);

    const etapas = [
        {
            nome: "Solicitações",
            link: "/",
        },
        {
            nome: "Pagamento",
            link: `/pay/${user?.id}`,
            descricao: paid ? <p className="flex gap-1 items-start leading-tight text-green-500"><CheckCircle size={16} className="mt-0.5" weight="fill"/> Seu pagamento foi aprovado!</p> : <p className="text-red-500 flex items-center gap-1"><Info size={16} /> Efetue o pagamento.</p>
        },
        {
            nome: <span>Pedido {etapaAtual === 3 && <span className={clsx("text-sm font-normal", {
                "text-yellow-600": Number(conf?.confirms) < Number(conf?.total),
                "text-green-500": conf?.confirms === conf?.total,
            })}>{`(${conf?.confirms}/${conf?.total})`}</span>}</span>,
            link: paid ? (user?.confirmado ? "" : `/confirmar-pedido`) : "",
            descricao: paid ? (
                !user?.confirmado ? <p className="text-red-500 flex items-center gap-1"><Info size={16} /> Confirme o pedido.</p> : <p className="text-green-500 flex items-center gap-1"><CheckCircle size={16} /> Pedido confirmado!</p>
            ) : (
                <p className="text-red-500 flex items-center gap-1"><Info size={16} /> Pagamento não realizado.</p>
            )
        },
        {
            nome: "Produção",
            descricao:
                <div className="leading-tight flex flex-col gap-1 text-yellow-600">
                    <span>O pedido está sendo produzido.<br />Ficará pronto até <span className="font-bold text-white">17/05</span></span>
                    <span className="flex items-end animate-pulse">...<Gear size={24} className="animate-spin" />...</span>
                </div>
        },
        {
            nome: "Entrega",
            descricao:
                <div className="leading-tight flex flex-col gap-1 text-yellow-600">
                    <span>O pedido está a caminho.<br />Chegará até <span className="font-bold text-white">17/05</span></span><span className="flex items-end animate-bounce">...<Truck size={24} />...</span>
                </div>
        },
        {
            nome: "Distribuição",
            descricao:
            <div className="flex flex-col gap-2 items-start">
                <p className="text-white text-sm">As camisas chegaram!<br />Marque um ponto de encontro.</p>
                <a target="__blank" href="https://wa.me/5571984760838" className="flex items-center gap-2 bg-white rounded-md p-2">
                    <WhatsappLogo size={24} className="text-green-500" weight="fill" />
                    <span className="text-green-500 font-bold">Fale comigo!</span>
                </a>
            </div>,
        }
    ];

    return (etapaAtual && paid !== null && conf) ? (
        <ScrollArea.Root className="!static w-full h-full overflow-hidden flex justify-center">
            <ScrollArea.Viewport className="w-full h-full pb-16 visao-geral">
                <div className="flex flex-col gap-16 pt-12">
                    <Link className="flex flex-col" to="/">
                        <img src={logo} alt="UniForm" className="h-7" />
                    </Link>
                    <div className="flex flex-col gap-5 h-full justify-center">
                        {etapas.map((etapa, i) => {

                            return (
                                <div key={String(etapa.nome)} className="relative">
                                    <div className="flex items-center gap-3">
                                        <div className={clsx("w-5 h-5 flex items-center justify-center rounded-full p-4 z-50", {
                                            "bg-zinc-700": etapaAtual < i+1,
                                            "bg-violet-600": etapaAtual === i+1,
                                            "bg-green-500": etapaAtual > i+1,
                                            "bg-red-500": etapa.nome === "Pagamento" && etapaAtual === 3 && !paid,
                                        })}>
                                            {(etapaAtual < i+1) && <p className="text-white font-bold">{i+1}</p>}
                                            {(etapaAtual === i+1) && <p><DotsThree size={24} className="text-white" weight="bold" /></p>}
                                            {(etapa.nome === "Pagamento" && !paid && etapaAtual === 3) ? <p><X size={16} className="text-white" weight="bold" /></p> : (
                                                etapaAtual > i+1 && <p><Check size={16} className="text-white" weight="bold" /></p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-lg">{etapa.nome}</p>
                                            {(etapaAtual === i+1 && etapa.descricao) && (
                                                <span className="text-white text-sm">{etapa.descricao}</span>
                                            )}
                                        </div>
                                        {(etapaAtual === i+1 && etapa.link && (etapaAtual !== 2 || !paid)) && (
                                            <Link to={etapa.link}>
                                                <ArrowSquareOut size={24} className="text-violet-600" />
                                            </Link>
                                        )}
                                    </div>
                                    {i+1 !== etapas.length && <div className={clsx("absolute w-1 left-3.5 h-8 top-[1.75rem] rounded-full", {
                                        "bg-zinc-700": etapaAtual <= i+1,
                                        "bg-green-500": etapaAtual > i+1,
                                        "bg-red-500": etapa.nome === "Pagamento" && etapaAtual === 3 && !paid,
                                        "h-[3rem]": etapaAtual === 2 || etapaAtual === 3,
                                        "h-[5.5rem] top-[1.9rem]": etapaAtual === 4 && (i+1 === 4 || i+1 === 3),
                                        "h-[5.5rem] top-[2rem]": etapaAtual === 5 || etapaAtual === 6,
                                    })} />}
                                </div>
                            );
                        })}
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
    ) : (user ? <div className="flex items-center justify-center"><CircleNotch className="text-white animate-spin" size={32} /></div> : <Navigate to="/login" />);
}