import * as ScrollArea from "@radix-ui/react-scroll-area";
import logo from "../assets/UniForm.svg";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ArrowSquareOut, Check, DotsThree } from "@phosphor-icons/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function VisaoGeral() {
    const {user} = useContext(AuthContext);

    const etapas = [
        {
            nome: "Solicitações",
            link: "/",
        },
        {
            nome: "Pagamento",
            link: `/pay/${user?.id}`,
        },
        {
            nome: "Pedido",
            link: "/",
        },
        {
            nome: "Entrega",
            link: "/",
        }
    ];
    const etapaAtual = 1;

    return (
        <ScrollArea.Root className="!static w-full h-full overflow-hidden flex justify-center">
            <ScrollArea.Viewport className="w-full h-full pb-16">
                <div className="flex flex-col gap-16 pt-12 h-screen">
                    <Link className="flex flex-col" to="/">
                        <img src={logo} alt="UniForm" className="h-7" />
                    </Link>
                    <div className="flex flex-col gap-5 h-full justify-center">
                        {etapas.map((etapa, i) => {

                            return (
                                <div key={etapa.nome} className="relative">
                                    <div className="flex items-center gap-3">
                                        <div className={clsx("w-5 h-5 flex items-center justify-center rounded-full p-4 z-50", {
                                            "bg-zinc-700": etapaAtual < i+1,
                                            "bg-violet-600": etapaAtual === i+1,
                                            "bg-green-500": etapaAtual > i+1,
                                        })}>
                                            {(etapaAtual < i+1) && <p className="text-white font-bold">{i+1}</p>}
                                            {(etapaAtual === i+1) && <p><DotsThree size={24} className="text-white" weight="bold" /></p>}
                                            {(etapaAtual > i+1) && <p><Check size={16} className="text-white" weight="bold" /></p>}
                                        </div>
                                        <p className="text-white font-black text-lg">{etapa.nome}</p>
                                        {etapaAtual === i+1 && (
                                            <Link to={etapa.link}>
                                                <ArrowSquareOut size={24} className="text-violet-600" />
                                            </Link>
                                        )}
                                    </div>
                                    {i+1 !== etapas.length && <div className={clsx("absolute h-7 w-1 left-3.5 top-[1.75rem] rounded-full", {
                                        "bg-zinc-700": etapaAtual <= i+1,
                                        "bg-green-500": etapaAtual > i+1,
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
    );
}