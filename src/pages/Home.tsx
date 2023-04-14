import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/UniForm.svg";
import { Info } from "@phosphor-icons/react";
import { api } from "../lib/api";

export function Home() {
    const {signed, user} = useContext(AuthContext);
    const [countSolic, setCountSolic] = useState(null);

    useEffect(() => {
        api.get("/requests/count").then(response => {
            setCountSolic(response.data);
        });
    }, []);

    return signed && user ? (
        <div className="flex flex-col justify-center items-center text-white text-2xl gap-10">
            <div className="flex flex-col items-center">
                <p className="font-black text-3xl">Olá, {user.nome}!</p>
                <p className="text-base mt-2">Você já enviou a solicitação de sua camisa.</p>
            </div>

            <div className="flex max-w-[21rem] text-yellow-600">
                <Info weight="fill" />
                <div className="flex flex-col text-justify ml-2 w-[18rem]">
                    <p className="text-sm">Para poder prosseguir com o pagamento é necessário uma solicitação mínima de 30 camisas.</p>
                    <p className="text-xs text-red-600 mt-1">Solicitações feitas: {countSolic}</p>
                </div>
            </div>
        </div>
    ) : (
        <div className="py-20 flex flex-col items-center font-black">
            <div className="flex flex-col">
                <img src={logo} alt="UniForm" className="h-10" />
            </div>
            <div className="flex flex-col justify-center gap-5 h-full">
                <button className="w-48 bg-violet-600 rounded-md flex items-center justify-center py-2 transition-colors hover:bg-violet-500">
                    <Link to="/cadastro"><span className="text-white text-lg">Cadastre-se</span></Link>
                </button>
                <button className="w-48 bg-white rounded-md flex items-center justify-center py-2 group">
                    <Link to="/login"><span className="text-violet-600 text-lg group-hover:text-violet-500 transition-all">Faça Login</span></Link>
                </button>
            </div>
        </div>
    );
}