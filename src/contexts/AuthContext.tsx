import { createContext, useState } from "react";

interface AuthContextProps {
    signed: boolean;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    signIn: (userData: User) => Promise<void>;
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

export function AuthProvider({ children }: AuthProviderProps) {
    const [signed, setSigned] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function signIn(userData: User) {
        
        setUser(userData);
        setSigned(true);
    };

    return (
        <AuthContext.Provider value={{ signed, user, setUser, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}