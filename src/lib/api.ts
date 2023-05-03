import axios from "axios";

export const api = axios.create({
    //baseURL: "https://uniform-server.onrender.com",
    baseURL: "http://localhost:3333",
});