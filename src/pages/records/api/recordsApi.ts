import axios from "axios";
import { InterviewRecordCreateDTO, InterviewRecordResponseDTO, InterviewRecordUpdateDTO, RecordDetailCreateDTO } from "./recordsApiList";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export const fetchSidebarData = async (): Promise<{ interviewRecordId: string; enterpriseName: string; category: string }[]> => {
    const response = await axios.get(`${SERVER_URL}/records/sidebar`, {headers: { Authorization: `Bearer ${TOKEN}` }});
    return response.data;
};

export const fetchRecordDetails = async (ResponseParams: string): Promise<InterviewRecordResponseDTO> => {
    const response = await axios.get(`${SERVER_URL}/records/interview`, {params: ResponseParams, headers:{'Authorization': `Bearer ${TOKEN}`}});
    return response.data;
};

export const updateDetail = async (
    interviewRecordId: string,
    detailIndex: number,
    payload: { question: string; answer: string }
) => {
    
    try {
        const response = await axios.put(`${SERVER_URL}/records/interview/${interviewRecordId}/detail/${detailIndex}`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error in updateDetail:", error);
        throw error;
    }
};

export const createRecord = async (data: InterviewRecordCreateDTO): Promise<{ id: string }> => {
    const response = await axios.post(`${SERVER_URL}/records/interview`, data, {
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    });
    return response.data; // 서버가 반환하는 데이터를 그대로 반환
};

export const fetchRecords = async (interviewId: string) => {
    const response = await axios.get(`${SERVER_URL}/records/interview${interviewId}`, {headers:{'Authorization': `Bearer ${TOKEN}`}});    
    return response.data;
};

export const createDetail = async (
    interviewRecordId: string,
    data: RecordDetailCreateDTO
) => {
    const response = await axios.post(
        `${SERVER_URL}/records/interview/${interviewRecordId}/detail`,
        data,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

export const fetchRecordById = async (interviewRecordId: string) => {
        const response = await axios.get(`${SERVER_URL}/records/interview/${interviewRecordId}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            }
        });
        return response.data; // 면접 기록 데이터 반환
};

export const updateRecord = async (interviewRecordId: string, data: InterviewRecordUpdateDTO ) => {
    try {
        const response = await axios.put(`${SERVER_URL}/records/interview/${interviewRecordId}`, data, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error in updateRecord:", error);
        throw error;
    }
};

export const deleteDetail = async ( interviewRecordId: string, detailIndex: number ) => {
    const response = await axios.delete(`${SERVER_URL}/records/interview/${interviewRecordId}/detail/${detailIndex}`,
        { headers: { 'Authorization': `Bearer ${TOKEN}`,}});
    return response.data;
}

export const deleteRecord = async ( interviewRecordId: string ) => {
     const response = await axios.delete(`${SERVER_URL}/records/interview/${interviewRecordId}`,
     { headers: { 'Authorization' : `Bearer ${TOKEN}`,}});
     return response.data;
}