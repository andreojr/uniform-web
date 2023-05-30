import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { CircleNotch } from "@phosphor-icons/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export function Solicitacoes() {
    const [requests, setRequests] = useState<Array<any> | null>(null);

    useEffect(() => {
        (async () => {
            const allRequests = await api.get('/requests');
            setRequests(allRequests.data);
        })();
    }, []);

    useEffect(() => {
        console.log(requests);
    }, [requests]);

    return requests ? (
        <ScrollArea.Root className="!static w-full h-full overflow-hidden flex justify-center">
            <ScrollArea.Viewport className="w-full h-full">
                <div>
                    {requests.map((request, i) => {
                        return (
                            <div key={request.id} className="my-5 bg-zinc-700 p-3 rounded-md">
                                <div className="flex flex-col">
                                    <span className="text-white font-bold">{request.user.nome}</span>
                                    <span className="text-zinc-500">{request.user.matricula}</span>
                                </div>

                                <div className="flex justify-between text-green-600">
                                    <span className="">{request.modelo === "classica" ? "Clássica" : "Alternativa"}</span>
                                    <span className="">{request.tamanho}</span>
                                    <span className="">{request.cor}</span>
                                </div>
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
    ) : (
        <div className="text-white flex items-center justify-center">
            <CircleNotch className="animate-spin" size={32} />
        </div>
    );
}