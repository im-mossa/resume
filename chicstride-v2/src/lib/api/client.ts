// src/lib/api/client.ts
import axios from "axios";
import https from "https"; //just for dev

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    timeout: 10000,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), //just for dev
});

apiClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
);
