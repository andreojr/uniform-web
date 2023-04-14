import { InputHTMLAttributes } from "react";

export function Input({...props}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className="text-white bg-zinc-700 rounded-md h-10 p-3 placeholder:text-zinc-500" {...props} />
    );
}