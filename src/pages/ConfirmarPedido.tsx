import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Check, CircleNotch, XCircle } from "@phosphor-icons/react";
import { Link, Navigate } from "react-router-dom";
import { api } from "../lib/api";
import { Solic } from "./Home";
import logo from "../assets/UniForm.svg";
import { modelos, cores } from "./Requests";
import { colors } from "../components/Shirts";
import clsx from "clsx";

export function ConfirmarPedido() {
    const { user, setUser } = useContext(AuthContext);

    const [solics, setSolics] = useState<Array<Solic> | null>(null);
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState(false);
    const [confirmed, setConfirmed] = useState(user?.confirmado || false);

    useEffect(() => {
        if (user) {
            api.get(`/requests/${user.id}`).then(response => {
                setSolics(response.data.results);
            });
        }
    }, []);

    async function handleUpdateUser() {
        const response = await api.get(`/login/${user?.matricula}`);
        setUser(response.data);
    }

    async function handleConfirmSolic() {
        if (!confirmed) {
            setConfirming(true);

            try {
                console.log(user);
                await api.patch(`/users/confirm-requests/${user?.id}`);
                setError(false);
                setConfirming(false);
                setConfirmed(true);
                await handleUpdateUser();
            } catch(err) {
                setError(true);
                setConfirming(false);
            }
        }
    }

    return (user) ? (
        solics ? (
            <div className="flex flex-col text-white gap-10 py-12 justify-center items-center">
                <Link className="flex flex-col gap-5" to="/">
                    <img src={logo} alt="UniForm" className="h-7" />
                </Link>
                <div className="flex flex-col gap-8 h-full justify-center">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            {modelos.map(modelo => {
                                let count = 0;
                                solics.forEach(solic => {
                                    if (solic.modelo === modelo) count++;
                                });

                                return count > 0 && (
                                    <div key={modelo} className="bg-zinc-700 w-64 rounded-md p-3 flex items-center justify-between">
                                        {modelo === "classica" ? "Clássica" : "Alternativa"}

                                        <div className="flex gap-2 items-center">
                                            {solics.map(solic => {
                                                let bg = "";
                                                colors.forEach(cor => {
                                                    if (cor.color === solic.cor) bg = cor.bg;
                                                });

                                                return solic.modelo === modelo && (
                                                    <div key={solic.id} className={`${bg} w-8 h-8 rounded-full flex items-center justify-center`}>
                                                        <span className="text-white font-bold text-base">{solic.tamanho}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={handleConfirmSolic} className={clsx("flex items-center justify-center w-full rounded-md p-2", {
                            "bg-yellow-600": !error && !confirmed,
                            "bg-red-500": error,
                            "bg-green-500": !error && confirmed,
                        })}>
                            {(!confirmed && !confirming) && <span className="font-bold">Confirmar</span>}
                            {confirming && <CircleNotch size={24} className="animate-spin" weight="bold" />}
                            {confirmed && <Check size={24} weight="bold" />}
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex justify-center items-center">
                <p className="text-white font-black text-lg">
                    <CircleNotch size={32} className="text-white animate-spin" />
                </p>
            </div>
        )
    ) : (
        <Navigate to="/login" />
    );
}