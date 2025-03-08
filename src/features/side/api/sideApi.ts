import axios from "axios";

import { accessToken } from "@/shared/api/tokens";
import { Summary } from "@/entities/records/model/Summary";
import { dtoToSide } from "../service/dtoToSide";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const client = axios.create({
    baseURL: `${SERVER_URL}`,
    headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    }
});

export const fetchSidebarData = async (): Promise<Summary[]> => {
    const response = await client.get('/sidebar');
    return dtoToSide(response.data);
};