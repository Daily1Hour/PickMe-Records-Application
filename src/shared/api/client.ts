import axios from "axios";

import { accessToken } from "./tokens";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default axios.create({
    baseURL: SERVER_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    validateStatus: (status) => {
        return status >= 200 && status < 500; // 500 아래는 따로 처리
    },
});
