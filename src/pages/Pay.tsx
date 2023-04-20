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

interface PixInfoProps {
    qrcode: string;
    hash: string;
}

export function Pay() {
    const { user_id } = useParams();
    const [value, setValue] = useState<number | null>(null);
    const [pixInfo, setPixInfo] = useState<PixInfoProps | null>(null);

    useEffect(() => {
        api.get(`/requests/${user_id}`).then(response => {
            console.log(response.data);
            if (response.data)
                setValue(response.data.length * precoUnitario);
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

    return (
        <div className="text-white font-black text-xl flex flex-col py-12">
            <Link className="flex flex-col" to="/">
                <img src={logo} alt="UniForm" className="h-10" />
            </Link>
            <div className="flex flex-col h-full justify-center items-center gap-5">
                <p>Valor: R$ {value},00</p>
                <div className="overflow-hidden rounded-md">
                    <div
                        style={{
                            backgroundImage: `url(${pixInfo?.qrcode})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                        className="w-[14rem] h-[14rem] rounded-md scale-[1.8]"
                    />
                </div>

                
            </div>
        </div>
    ); 
}