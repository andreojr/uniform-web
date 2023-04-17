import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/UniForm.svg";
import { Info, Trash } from "@phosphor-icons/react";
import { api } from "../lib/api";

interface Solic {
    id: string;
    modelo: "basico" | "codigo";
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
        <div className="flex flex-col justify-center text-white text-2xl gap-10">
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

            <div className="flex max-w-[21rem] text-yellow-600">
                <Info weight="fill" />
                <div className="flex flex-col text-justify ml-2 w-[18rem]">
                    <p className="text-sm">Para poder prosseguir com o pagamento é necessário uma solicitação mínima de 30 camisas.</p>
                    <p className="text-xs text-red-600 mt-1">Solicitações feitas: {countSolic}</p>
                </div>
            </div>

            <div>
                {(mySolic && mySolic.length > 0) && (
                    <>
                        <p className="font-black pb-8">Minhas Solicitações</p>
                        <div className="w-full text-base table">
                            <tr>
                                <td>Modelo</td>
                                <td>Cor</td>
                                <td>Tamanho</td>
                            </tr>
                        </div>
                    </>
                )}
                {(mySolic && mySolic.length > 0) && mySolic.map(solic => (
                    <div className="table w-full align-middle bg-zinc-700 rounded-md my-4 justify-between items-center p-2 text-base">
                        <tr className="">
                            <td>
                                {solic.modelo === "codigo" && "Código"}
                                {solic.modelo === "basico" && "Básico"}
                            </td>
                            <td>{solic.cor}</td>
                            <td>{solic.tamanho}</td>
                            <td><Trash onClick={() => handleDeleteSolic(solic.id)} size={24} className="text-red-600 cursor-pointer" /></td>
                        </tr>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div className="py-20 flex flex-col items-center font-black">
            <div className="flex flex-col">
                <img src={logo} alt="UniForm" className="h-10" />
            </div>
            <div className="flex flex-col justify-center gap-5 h-full">
                <button className="w-48 bg-violet-600 rounded-md flex items-center justify-center py-2 transition-colors hover:bg-violet-500">
                    <Link to="/cadastro"><span className="text-white text-lg">Adicionar pedidos</span></Link>
                </button>
                <button className="w-48 bg-white rounded-md flex items-center justify-center py-2 group">
                    <Link to="/login"><span className="text-violet-600 text-lg group-hover:text-violet-500 transition-all">Verificar status</span></Link>
                </button>
            </div>
        </div>
    );
}