import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/UniForm.svg";
import { CurrencyDollar, Info, Trash } from "@phosphor-icons/react";
import { api } from "../lib/api";
import { colors } from "../components/Shirts";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Solic {
    id: string;
    cor: string;
    tamanho: string;
}

export function Home() {
    const {signed, user} = useContext(AuthContext);
    const [countSolic, setCountSolic] = useState<number | null>(null);
    const [mySolic, setMySolic] = useState<Array<Solic> | null>(null);

    useEffect(() => {
        handleCountSolic();
    }, []);

    useEffect(() => {
        handleSetMySolics();
    }, [user]);

    function handleCountSolic() {
        api.get("/requests/count").then(response => {
            setCountSolic(response.data);
        });
    }

    function handleSetMySolics() {
        if (user) {
            api.get(`/requests/${user.id}`).then(response => {
                setMySolic(response.data);
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
        <div className="flex flex-col text-white text-2xl gap-10 py-20">
            <div className="flex flex-col">
                <img src={logo} alt="UniForm" className="h-10" />
            </div>
            <div className="flex flex-col gap-10 h-full justify-center">
                <div className="flex flex-col items-center">
                    <p className="font-black text-3xl">Olá, {user.nome}!</p>
                    {mySolic && mySolic.length > 0 && (
                        <p className="text-base mt-2">
                            Você já enviou sua solicitação.
                        </p>
                    )}
                    {mySolic && mySolic.length === 0 && (
                        <p className="text-base mt-2">Você não possui nenhuma solicitação. <Link className="text-violet-500" to="/cadastro">Envie agora</Link>.</p>
                    )}
                </div>

                {(mySolic && mySolic.length > 0) && (
                    <h4 className="font-black">Minhas solicitações</h4>
                )}
                <ScrollArea.Root className="!static w-full h-48 overflow-hidden flex justify-center">
                    <ScrollArea.Viewport className="w-full h-full pb-16">
                        <div className="flex flex-wrap justify-between w-full gap-10">
                            
                            {(mySolic && mySolic.length > 0) && mySolic.map(shirt => {

                                let preview;
                                colors.forEach(color => {
                                    if (shirt.cor === color.color) preview = color.preview;
                                });
                                
                                return !!preview && (
                                    <div className="flex flex-col items-center bg-zinc-700 rounded-md p-2">
                                        <img src={preview} alt="Preview" className="h-32" />
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
                    countSolic && countSolic < 30 ?
                    <div className="flex max-w-[21rem] text-yellow-600">
                        <Info weight="fill" />
                        <div className="flex flex-col text-justify ml-2 w-[18rem]">
                            <p className="text-sm">Para poder prosseguir com o pagamento é necessário uma solicitação mínima de 30 camisas.</p>
                            <p className="text-xs text-red-600 mt-1">Solicitações feitas: {countSolic}</p>
                        </div>
                    </div> :
                    <Link className="text-white bg-violet-600 flex items-center justify-center p-2 rounded-md gap-5" to={`/pay/${user.id}`}>
                        <span>Pagar</span>
                        <CurrencyDollar size={24} />
                    </Link>
                }
            </div>
        </div>
    ) : (
        <div className="py-20 flex flex-col items-center font-black">
            <div className="flex flex-col">
                <img src={logo} alt="UniForm" className="h-10" />
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