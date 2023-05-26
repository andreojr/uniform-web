import { createContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

interface AuthContextProps {
    signed: boolean;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    signIn: (userData: User) => Promise<void>;
    etapaAtual: number | null;
    setEtapaAtual: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface User {
    id: string;
    nome: string;
    matricula: string;
    confirmado: boolean;
}

interface AuthProviderProps {
    children: JSX.Element;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const dataProd = dayjs("2023-05-26").locale("pt-br");
export const dataEntrega = dayjs("2023-06-07").locale("pt-br");

export function AuthProvider({ children }: AuthProviderProps) {
    const [signed, setSigned] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [etapaAtual, setEtapaAtual] = useState<number | null>(null);

    useEffect(() => {
        api.get("/etapa-atual").then(response => {
            if (etapaAtual === 4 && dataProd < dayjs()) {
                setEtapaAtual(5);
            } else if (etapaAtual === 5 && dataEntrega < dayjs()) {
                setEtapaAtual(6);
            } else {
                setEtapaAtual(response.data);
            }
        });
    }, []);


    async function signIn(userData: User) {
        
        setUser(userData);
        setSigned(true);
    };

    return (
        <AuthContext.Provider value={{ signed, user, setUser, signIn, etapaAtual, setEtapaAtual }}>
            {children}
        </AuthContext.Provider>
    );
}