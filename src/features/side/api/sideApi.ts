import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const client = axios.create({
    baseURL: `${SERVER_URL}/records`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    }});

    
export const fetchSidebarData = async (): Promise<{ interviewRecordId: string; enterpriseName: string; category: string }[]> => {
    const response = await client.get('/sidebar');
    return response.data;
};

export const deleteRecord = async ( interviewRecordId: string ) => {
    const response = await client.delete(`/interview/${interviewRecordId}`);
    return response.data;
}