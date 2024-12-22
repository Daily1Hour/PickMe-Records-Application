import axios from "axios";
import { InterviewRecordCreateDTO, InterviewRecordResponseDTO, InterviewRecordUpdateDTO, RecordDetailCreateDTO } from "./recordsApiList";

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

export const fetchRecordDetails = async (ResponseParams: string): Promise<InterviewRecordResponseDTO> => {
    const response = await client.get('/interview',{params: ResponseParams});
    return response.data;
};

export const updateDetail = async (interviewRecordId: string, detailIndex: number, payload: { question: string; answer: string }) => {
    try {
        const response = await client.put(`/interview/${interviewRecordId}/detail/${detailIndex}`, payload);
        return response.data;
    } catch (error) {
        console.error("Error in updateDetail:", error);
        throw error;
    }
};

export const createRecord = async (data: InterviewRecordCreateDTO): Promise<{ id: string }> => {
    const response = await client.post(`/interview`, data);
    return response.data;
};

export const fetchRecords = async (interviewId: string) => {
    const response = await client.get(`/interview${interviewId}`);
    return response.data;
};

export const createDetail = async (interviewRecordId: string, data: RecordDetailCreateDTO) => {
    const response = await client.post(`/interview/${interviewRecordId}/detail`, data);
    return response.data;
};

export const fetchRecordById = async (interviewRecordId: string) => {
    const response = await client.get(`/interview/${interviewRecordId}`);
    return response.data;
};

export const updateRecord = async (interviewRecordId: string, data: InterviewRecordUpdateDTO ) => {
    try {
        const response = await client.put(`/interview/${interviewRecordId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error in updateRecord:", error);
        throw error;
    }
};

export const deleteDetail = async ( interviewRecordId: string, detailIndex: number ) => {
    const response = await client.delete(`/interview/${interviewRecordId}/detail/${detailIndex}`);
    return response.data;
}

export const deleteRecord = async ( interviewRecordId: string ) => {
    const response = await client.delete(`/interview/${interviewRecordId}`);
    return response.data;
}