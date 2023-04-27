import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/UniForm.svg";
import { Check, CircleNotch, CurrencyDollar, Info, Plus, Trash, WhatsappLogo } from "@phosphor-icons/react";
import { api } from "../lib/api";
import { colors } from "../components/Shirts";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Solic {
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
    const {signed, user} = useContext(AuthContext);
    const [countSolic, setCountSolic] = useState<number | null>(null);
    const [paid, setPaid] = useState({ loading: true, paid: false });
    const [mySolic, setMySolic] = useState<Array<Solic> | null>(null);

    useEffect(() => {
        handleCountSolic();
    }, []);

    useEffect(() => {
        handleSetMySolics();
    }, [user]);

    useEffect(() => {
        if (mySolic) {
            console.log(mySolic);
            let paid = true;
            mySolic.forEach(solic => {
                if (!solic.pay) paid = false;
            });
            setPaid({ loading: false, paid });
        }
    }, [mySolic]);

    function handleCountSolic() {
        api.get("/requests/count").then(response => {
            setCountSolic(response.data);
        });
    }

    function handleSetMySolics() {
        if (user) {
            api.get(`/requests/${user.id}`).then(response => {
                setMySolic(response.data.results);
            });
        }
    }

    async function handleDeleteSolic(id: string) {
        try {
            await api.delete(`/requests/${id}`);
            handleSetMySolics();
            handleCountSolic();
        } catch(err) {
            console.log(err);
        }
    }

    return signed && user ? (
        <div className="flex flex-col text-white gap-10 py-12 justify-center items-center">
            {
                (mySolic && !paid.loading) ?
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
                                    <Link to={`/cadastro/${user.matricula}`}>
                                        <Plus size={24} />
                                    </Link>
                                </div>
                            )}
                                
                                    <ScrollArea.Root className="!static w-full h-[15rem] overflow-hidden flex justify-center">
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
                                                            <Trash onClick={() => handleDeleteSolic(shirt.id)} size={24} className="text-red-400 cursor-pointer" />
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

                            {
                                (countSolic && countSolic < 60) &&
                                <div className="flex max-w-[21rem] text-yellow-600">
                                    <Info weight="fill" className="text-2xl" />
                                    <div className="flex flex-col text-justify ml-2 w-[18rem]">
                                        <p className="text-sm">Para poder prosseguir com o pagamento é necessário uma solicitação mínima de 60 camisas.</p>
                                        <p className="text-xs text-red-600 mt-1">Solicitações feitas: {countSolic}</p>
                                    </div>
                                </div>
                            }
                            {
                                (countSolic && countSolic >= 60) &&
                                (
                                    !paid.paid
                                    ?
                                    <Link className="text-white bg-violet-600 flex items-center justify-center p-2 rounded-md gap-2" to={`/pay/${user.id}`}>
                                        <CurrencyDollar size={24} />
                                        <span>Pagar</span>
                                    </Link>
                                    :
                                    <div className="text-white bg-green-500 flex items-center justify-center p-2 rounded-md gap-2">
                                        <span>Pago!</span>
                                        <Check size={24} />
                                    </div>
                                )
                            }

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
    ) : (
        <div className="py-20 flex flex-col items-center font-black">
            <div className="flex flex-col">
                <img src={logo} alt="UniForm" className="h-7" />
            </div>
            <div className="flex flex-col justify-center gap-5 h-full">
                <button className="w-52 bg-violet-600 rounded-md flex items-center justify-center py-2 transition-colors hover:bg-violet-500">
                    <Link to="/cadastro"><span className="text-white text-lg">Adicionar pedidos</span></Link>
                </button>
                <button className="w-52 bg-white rounded-md flex items-center justify-center py-2 group">
                    <Link to="/login"><span className="text-violet-600 text-lg group-hover:text-violet-500 transition-all">Verificar status</span></Link>
                </button>
            </div>
        </div>
    );
}