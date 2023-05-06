import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Check, CircleNotch, Pencil, Plus, Trash, XCircle } from "@phosphor-icons/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        handleSetSolics();
    }, []);

    async function handleSetSolics() {
        if (user) {
            api.get(`/requests/${user.id}`).then(response => {
                setSolics(response.data.results);
            });
        }
    }

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
                navigate("/visao-geral");
            } catch(err) {
                setError(true);
                setConfirming(false);
            }
        }
    }

    return (user) ? (
        solics ? (
            !edit ? (
                <div className="flex flex-col text-white gap-10 py-12 justify-center items-center">
                    <Link className="flex flex-col gap-5" to="/">
                        <img src={logo} alt="UniForm" className="h-7" />
                    </Link>
                    <div className="flex flex-col gap-8 h-full justify-center">
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 grid-flow-row w-full gap-4">
                                {(solics.length > 0) && solics.map(shirt => {

                                    let preview;
                                    colors.forEach(color => {
                                        if (shirt.cor === color.color) preview = color[shirt.modelo];
                                    });

                                    return !!preview && (
                                        <div key={shirt.id} className="relative flex flex-col items-center bg-zinc-700 rounded-md p-2">
                                            <img src={preview} alt="Preview" className="h-32" />
                                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-700/70 p-2 rounded-md font-black text-sm">{shirt.tamanho}</p>
                                            <Pencil onClick={() => navigate(`/editar/${shirt.id}`)} size={24} className="text-yellow-600 cursor-pointer" />
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
                <div className="flex flex-col text-white gap-10 py-12 justify-center items-center">
                </div>
            )
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