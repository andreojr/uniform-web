import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { precoUnitario } from "./Cadastro";

import logo from "../assets/UniForm.svg";

// QR Codes
    import qrcode from "../assets/qrcode.jpeg";
    import qrcode1 from "../assets/qrcode_1x.jpeg";
    import qrcode2 from "../assets/qrcode_2x.jpeg";
    import qrcode3 from "../assets/qrcode_3x.jpeg";
import { Check, CircleNotch, Copy, WhatsappLogo } from "@phosphor-icons/react";
import copy from "copy-to-clipboard";
import clsx from "clsx";
import { handleShowName } from "./Home";

interface PixInfoProps {
    qrcode: string;
    hash: string;
}

export function Pay() {
    const { user_id } = useParams();
    const [value, setValue] = useState<number | null>(null);
    const [pixInfo, setPixInfo] = useState<PixInfoProps | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        api.get(`/requests/${user_id}`).then(response => {
            console.log(response.data);
            if (response.data)
                setValue(response.data.count * precoUnitario);
        });
    }, []);

    useEffect(() => {
        if (value) {
            const pixInfoUpdate: PixInfoProps = {qrcode: "", hash: ""};
            if (value === precoUnitario) {
                pixInfoUpdate.qrcode = qrcode1;
                pixInfoUpdate.hash = "00020101021126810014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb02191x UniForm  EngComp520400005303986540527.005802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***6304B477";
            } else if (value === precoUnitario * 2) {
                pixInfoUpdate.qrcode = qrcode2;
                pixInfoUpdate.hash = "00020101021126820014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb02202x UniForms  EngComp520400005303986540554.005802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***63040000";
            } else if (value === precoUnitario * 3) {
                pixInfoUpdate.qrcode = qrcode3;
                pixInfoUpdate.hash = "00020101021126820014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb02203x UniForms  EngComp520400005303986540581.005802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***63043DC4";
            } else {
                pixInfoUpdate.qrcode = qrcode;
                pixInfoUpdate.hash = "00020101021126790014br.gov.bcb.pix0136f0bdb4f2-57d8-4db8-bf88-971a72076ffb0217UniForms  EngComp5204000053039865802BR5919ANDRE L DE O JUNIOR6008SALVADOR62070503***630436DD";
            }
            setPixInfo(pixInfoUpdate);
        }
    }, [value]);

    function handleCopyHash(str: string) {
        copy(str);
        setCopied(true);
    }

    return (value && pixInfo) ? (
        <div className="text-white font-black flex flex-col py-12">
            <Link className="flex flex-col" to="/">
                <img src={logo} alt="UniForm" className="h-7" />
            </Link>
            <div className="flex flex-col h-full justify-center items-center gap-5">
                <div className="overflow-hidden rounded-md">
                    <div
                        style={{
                            backgroundImage: `url(${pixInfo.qrcode})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                        className="w-[14rem] h-[14rem] rounded-md scale-[1.8]"
                    />
                </div>
                <div className="bg-zinc-700 w-[14rem] p-4 rounded-md relative">
                    <p className="text-xs w-full break-all text-zinc-400">{pixInfo.hash.slice(0, 100)}</p>
                    <button onClick={() => handleCopyHash(pixInfo.hash)} className={clsx("text-white flex items-center justify-center gap-3 w-full absolute bottom-0 left-0 rounded-md py-3", {
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
                <p className="text-xl">Valor: <span className="text-green-500">R$ {value},00</span></p>
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