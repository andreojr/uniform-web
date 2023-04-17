import { CheckCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function CadastroFinalizado() {
    return (
        <div className="flex flex-col justify-center items-center w-[16rem] gap-2">
            <CheckCircle className="text-green-600" size={64} weight="fill" />
            <p className="text-white text-2xl font-black text-center">Solicitação feita com sucesso!</p>
            <button className="bg-violet-600 rounded-md flex items-center justify-center py-2 px-4 transition-colors mt-5 hover:bg-violet-500">
                <Link to="/login"><span className="text-white">Checar status</span></Link>
            </button>
        </div>
    );
}