import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { precoUnitario } from "./Cadastro";

import logo from "../assets/UniForm.svg";
import { Check, CircleNotch, Copy, Info, WhatsappLogo } from "@phosphor-icons/react";
import copy from "copy-to-clipboard";
import clsx from "clsx";

import qrcode1 from "../assets/qrcode_1x.jpeg";
import qrcode2 from "../assets/qrcode_2x.jpeg";
import qrcode3 from "../assets/qrcode_3x.jpeg";
import qrcode4 from "../assets/qrcode_4x.jpeg";

export const freteTotal = 52.2;

interface Payment {
    hash: string;
    qrcode: string;
}

export function Pay() {
    const { user_id } = useParams();
    const [frete, setFrete] = useState<number | null>(null);
    const [value, setValue] = useState<number | null>(null);
    const [pay, setPay] = useState<Payment | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        api.get(`/users/generate-pay/${user_id}`).then(response => {
            if (response.data) {
                console.log(response.data);
                setValue(response.data.count * precoUnitario);
                setFrete(response.data.frete);
            }
        });
    }, []);

    useEffect(() => {
        if (value) {
            const count = value / precoUnitario;
            const payUpdate = {} as Payment;
            if (count === 1) {
                payUpdate.qrcode = qrcode1;
                payUpdate.hash = "00020101021126720014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb02101x UniForm520400005303986540527.675802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***6304DC59";
            } else if (count === 2) {
                payUpdate.qrcode = qrcode2;
                payUpdate.hash = "00020101021126720014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb02102x UniForm520400005303986540555.345802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***63047208";
            } else if (count === 3) {
                payUpdate.qrcode = qrcode3;
                payUpdate.hash = "00020101021126720014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb02103x UniForm520400005303986540583.015802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***63048726";
            } else if (count === 4) {
                payUpdate.qrcode = qrcode4;
                payUpdate.hash = "00020101021126720014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb02104x UniForm5204000053039865406110.685802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***63043D36";
            }

            setPay(payUpdate);
        }
    }, [value]);

    function handleCopyHash(str: string) {
        copy(str);
        setCopied(true);
    }

    return (frete && value && pay) ? (
        <div className="text-white flex flex-col py-12">
            <Link className="flex flex-col" to="/">
                <img src={logo} alt="UniForm" className="h-7" />
            </Link>
            <div className="flex flex-col h-full justify-center items-center gap-5">
                <div className="overflow-hidden rounded-md">
                    <div
                        style={{
                            backgroundImage: `url(${pay.qrcode})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                        className="w-[14rem] h-[14rem] rounded-md scale-[1.8]"
                    />
                </div>
                <div className="bg-zinc-700 w-[14rem] p-4 rounded-md relative">
                    <p className="text-xs w-full break-all text-zinc-400">{pay.hash}</p>
                    <button onClick={() => handleCopyHash(pay.hash)} className={clsx("text-white flex items-center justify-center gap-3 w-full absolute bottom-0 left-0 rounded-md py-3", {
                        "bg-violet-600": !copied,
                        "bg-green-500": copied,
                    })}>
                        <span className="text-xs">
                            {
                                !copied
                                ? "Copiar Pix Copia e Cola"
                                : "Copiado!"
                            }
                        </span>
                        {!copied ? <Copy size={16} weight="fill" /> : <Check size={16} weight="bold" />}
                    </button>
                </div>
                <div className="flex flex-col items-end text-right">
                    <div className="w-full flex justify-between text-sm text-zinc-400 font-black">
                        <p>Valor:</p>
                        <span>R$ {value},00</span>
                    </div>
                    <div className="w-full flex justify-between text-xs text-zinc-400">
                        <p>Frete: <span className="text-[0.6rem]">(R$ {(frete / (value / precoUnitario)).toFixed(2).replace(".", ",")} cada)</span></p>
                        <span>+ R$ {frete.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="w-full flex justify-between text-xl gap-16 font-black">
                        <p className="text-white">Total:</p>
                        <span className="text-green-500">R$ {(value+frete).toFixed(2).replace(".", ",")}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-white text-sm">Já efetuou o pagamento?</p>
                    <a target="__blank" href="https://wa.me/5571984760838?text=Ol%C3%A1%2C+Andr%C3%A9%21+J%C3%A1+fiz+o+pagamento+do+UniForm." className="flex justify-center items-center gap-2 bg-white rounded-md py-2">
                        <WhatsappLogo size={24} className="text-green-500" weight="fill" />
                        <span className="text-green-500">Me informe</span>
                    </a>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center">
            <p className="text-white font-black text-lg">
                <CircleNotch size={32} className="text-white animate-spin" />
            </p>
        </div>
    );
}