import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/UniForm.svg";
import { Check, CircleNotch, CurrencyDollar, Eye, Info, Plus, SignOut, Trash, WhatsappLogo } from "@phosphor-icons/react";
import { api } from "../lib/api";
import { colors } from "../components/Shirts";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export interface Solic {
    id: string;
    cor: string;
    tamanho: string;
    modelo: "classica" | "alternativa";
    pay: boolean;
}

export function handleShowName(name: string) {
    const firstName = name.trim().split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

export function Home() {
    const { signed, user, setUser } = useContext(AuthContext);
    const [countSolic, setCountSolic] = useState<number | null>(null);
    const [mySolic, setMySolic] = useState<Array<Solic> | null>(null);

    const [etapaAtual, setEtapaAtual] = useState<number | null>(null);

    useEffect(() => {
        api.get("/etapa-atual").then(response => {
            setEtapaAtual(response.data);
        });
        handleCountSolic();
    }, []);

    useEffect(() => {
        handleSetMySolics();
    }, [user]);

    function handleSetMySolics() {
        if (user) {
            api.get(`/requests/${user.id}`).then(response => {
                setMySolic(response.data.results);
            });
        }
    }

    function handleCountSolic() {
        api.get("/requests/count").then(response => {
            setCountSolic(response.data);
        });
    }

    async function handleDeleteSolic(id: string) {
        try {
            await api.delete(`/requests/${id}`);
            handleSetMySolics();
            handleCountSolic();
        } catch (err) {
            console.log(err);
        }
    }

    return (signed && user && etapaAtual) ? (
        <div className="flex flex-col text-white gap-10 py-12 justify-center items-center">
            {
                (mySolic) ?
                    (
                        <>
                            <div className="flex flex-col">
                                <img src={logo} alt="UniForm" className="h-7" />
                            </div>
                            <div className="flex flex-col gap-10 h-full justify-center">
                                <div className="flex flex-col items-center">
                                    <p className="font-black text-xl">Olá, {handleShowName(user.nome)}!</p>
                                    {mySolic.length > 0 && (
                                        <p className="text-sm">
                                            Você já enviou sua solicitação.
                                        </p>
                                    )}
                                    {mySolic.length === 0 && (
                                        <p className="text-sm">Você não possui nenhuma solicitação. <Link className="text-violet-500" to="/cadastro">Envie agora</Link>.</p>
                                    )}
                                </div>

                                {(mySolic.length > 0) && (
                                    <div className="w-full flex justify-between items-center">
                                        <h4 className="font-black text-xl">Solicitações</h4>
                                        {etapaAtual === 1 ?
                                            <Link to={`/cadastro/${user.matricula}`}>
                                                <Plus size={24} />
                                            </Link> :
                                            <div className="cursor-not-allowed text-zinc-700">
                                                <Plus size={24} />
                                            </div>
                                        }
                                    </div>
                                )}

                                <ScrollArea.Root className="!static w-full h-[10rem] overflow-hidden flex justify-center">
                                    <ScrollArea.Viewport className="w-full h-full">
                                        <div className="grid grid-cols-2 grid-flow-row w-full gap-10">
                                            {(mySolic.length > 0) && mySolic.map(shirt => {

                                                let preview;
                                                colors.forEach(color => {
                                                    if (shirt.cor === color.color) preview = color[shirt.modelo];
                                                });

                                                return !!preview && (
                                                    <div key={shirt.id} className="relative flex flex-col items-center bg-zinc-700 rounded-md p-2">
                                                        <img src={preview} alt="Preview" className="h-32" />
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-700/70 p-2 rounded-md font-black text-sm">{shirt.tamanho}</p>
                                                        {etapaAtual === 1 && <Trash onClick={() => handleDeleteSolic(shirt.id)} size={24} className="text-red-400 cursor-pointer" />}
                                                    </div>

                                                );
                                            })}
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


                                {etapaAtual < 3 ? (
                                    <div className="flex flex-col gap-5">
                                        <button className="w-full bg-violet-600 rounded-md flex items-center justify-center py-2 hover:bg-violet-500 transition-colors">
                                            <Link to="/visao-geral"><span className="text-white text-lg transition-all font-bold flex gap-2 items-center"><Eye size={24} />Visão geral</span></Link>
                                        </button>
                                        {
                                            user.matricula === "223116037" &&
                                            <button className="w-full bg-white text-violet-600 rounded-md flex items-center justify-center py-2 hover:text-violet-500 transition-colors">
                                                <Link to="/adm-pay"><span className="text-lg transition-all font-bold flex gap-2 items-center"><CurrencyDollar size={24} />Pagamentos</span></Link>
                                            </button>
                                        }
                                    </div>
                                ) : (
                                    <button onClick={() => setUser(null)} className="bg-red-500 rounded-md flex items-center justify-center gap-1 py-2">
                                        <p>Sair</p>
                                        <SignOut size={24} />
                                    </button>
                                )}

                                { }

                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <p className="text-white text-base">Alguma dúvida?</p>
                                    <a target="__blank" href="https://wa.me/5571984760838" className="w-7/12 flex justify-center items-center gap-2 bg-white rounded-md py-2">
                                        <WhatsappLogo size={24} className="text-green-500" weight="fill" />
                                        <span className="text-green-500">Fale comigo!</span>
                                    </a>
                                </div>
                            </div>
                        </>
                    )
                    :
                    <div className="flex justify-center items-center">
                        <p className="text-white font-black text-lg">
                            <CircleNotch size={32} className="text-white animate-spin" />
                        </p>
                    </div>
            }
        </div>
    ) : etapaAtual ? (
        <div className="py-20 flex flex-col items-center font-black">
            <div className="flex flex-col">
                <img src={logo} alt="UniForm" className="h-7" />
            </div>
            <div className="flex flex-col justify-center gap-5 h-full">
                {etapaAtual === 1 && (
                    <button className="w-52 bg-violet-600 rounded-md flex items-center justify-center py-2 transition-colors hover:bg-violet-500">
                        <Link to="/cadastro"><span className="text-white text-lg">Adicionar pedidos</span></Link>
                    </button>
                )}
                <button className="w-52 bg-white rounded-md flex items-center justify-center py-2 group">
                    <Link to="/login"><span className="text-violet-600 text-lg group-hover:text-violet-500 transition-all">Minhas solicitações</span></Link>
                </button>
                {etapaAtual === 2 && (
                    <button className="w-52 bg-violet-600 rounded-md flex items-center justify-center py-2 transition-colors hover:bg-violet-500">
                        <Link to="/requests"><span className="text-white text-lg">Ver pedido</span></Link>
                    </button>
                )}
                {etapaAtual >= 3 && (
                    <button className="w-52 bg-violet-600 rounded-md flex items-center justify-center py-2 transition-colors hover:bg-violet-500">
                        <Link to="/visao-geral"><span className="text-white text-lg">Visão Geral</span></Link>
                    </button>
                )}
            </div>
        </div>
    ) : <div className="flex items-center justify-center"><CircleNotch size={32} className="text-white animate-spin" /></div>;
}