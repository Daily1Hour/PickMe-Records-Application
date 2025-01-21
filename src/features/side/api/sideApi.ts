import { accessToken } from "@/shared/api/token";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const client = axios.create({
    baseURL: `${SERVER_URL}/records`,
    headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    }
});
export const fetchSidebarData = async (): Promise<{ interviewRecordId: string; enterpriseName: string; category: string }[]> => {
    const response = await client.get('/sidebar');
    return response.data;
};