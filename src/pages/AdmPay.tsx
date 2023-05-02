import { Link } from "react-router-dom";
import logo from "../assets/UniForm.svg";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowFatRight, Check, CheckSquare, CircleNotch, X, XSquare } from "@phosphor-icons/react";
import { api } from "../lib/api";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface User {
    id: string;
    nome: string;
    matricula: string;
    curso: string;
    pay: boolean;
    count: number;
}

export function AdmPay() {
    const [passVerify, setPassVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);
    const [users, setUsers] = useState<Array<User> | null>(null);

    useEffect(() => {
        if (passVerify) {
            api.get("/users").then(response => {
                setUsers(response.data);
            });
        }
    }, [passVerify]);

    useEffect(() => {
        if (users) {
        }
    }, [users]);

    async function handlePass(e: React.MouseEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.get(`/paypass-verify/${pass}`);
            setPass("");
            setPassVerify(true);
            setLoading(false);
            setError(false);
        } catch(e) {
            setError(true);
        }
    }
    
    async function handleTogglePay(user: User) {
        if (user.pay) await api.patch(`/users/unpay/${user.matricula}`);
        else await api.patch(`/users/pay/${user.matricula}`);
        setPassVerify(false);
    }

    return (
        <div className="pt-12 flex flex-col items-center gap-16 text-white">
            <Link className="flex flex-col" to="/">
                <img src={logo} alt="UniForm" className="h-7" />
            </Link>
            {(!loading && passVerify) ? (
                <ScrollArea.Root className="!static w-full h-full overflow-hidden flex justify-center">
                    <ScrollArea.Viewport className="w-full h-full pb-16">
                        <div className="grid grid-flow-row grid-cols-2 gap-5">
                            {users?.map(user => {
                                return (
                                    <div key={user.id} className="w-full bg-zinc-700 rounded-md flex flex-col p-2 gap-2 items-center justify-center text-center">
                                        <div>
                                            <p className="text-xl font-bold">{user.nome.trim().split(" ")[0]} <span className="text-base font-normal text-yellow-600">[{user.count}]</span></p>
                                            <span className="text-zinc-500">{user.matricula}</span>
                                        </div>

                                        <button onClick={() => handleTogglePay(user)} className={clsx("w-full flex rounded-md justify-center py-2", {
                                            "bg-red-500": !user.pay,
                                            "bg-green-500": user.pay,
                                        })}>
                                            {user.pay ? <Check size={16} className="text-white" /> : <X size={16} className="text-white" />}
                                        </button>
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
            ) : ((loading && !error) ? 
                <div className="flex items-center justify-center h-full"><CircleNotch size={32} className="animate-spin text-white" /></div>
                :
                <form className="flex flex-col justify-center h-full gap-5">
                    <Input
                        placeholder="Senha"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        type="password"
                    />
                    <button type="submit" onClick={handlePass} className={clsx("rounded-md flex items-center justify-center py-2 transition-colors", {
                        "bg-red-500 hover:bg-red-400": error,
                        "bg-violet-600 hover:bg-violet-600": !error,
                    })}>
                        <ArrowFatRight className="text-white" size={24} weight="fill" />
                    </button>
                </form>
            )}
        </div>
    );
}