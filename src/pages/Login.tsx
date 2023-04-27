import { useContext, useState } from "react";
import logo from "../assets/UniForm.svg";
import { Input } from "../components/Input";
import { ArrowFatRight } from "@phosphor-icons/react";
import clsx from "clsx";
import { api } from "../lib/api";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const {signed, signIn} = useContext(AuthContext);
    const [matricula, setMatricula] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e: React.MouseEvent) {
        e.preventDefault();
        try {
            const response = await api.get(`/login/${matricula.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "")}`);
            signIn(response.data);
            setError(false);
            navigate("/");
        } catch(err) {
            setError(true);
        }
    }

    return (
        <div className="py-20 flex flex-col items-center text-white">
            <Link className="flex flex-col" to="/">
                <img src={logo} alt="UniForm" className="h-7" />
            </Link>
            <form className="flex flex-col justify-center h-full gap-5">
                <Input
                    placeholder="Matrícula ou WhatsApp (só números)"
                    value={matricula}
                    onChange={e => setMatricula(e.target.value)}
                />
                <button type="submit" onClick={handleLogin} className={clsx("rounded-md flex items-center justify-center py-2 transition-colors", {
                    "bg-red-500 hover:bg-red-400": error,
                    "bg-violet-600 hover:bg-violet-600": !error,
                })}>
                    <ArrowFatRight className="text-white" size={24} weight="fill" />
                </button>
            </form>
        </div>
    );
}