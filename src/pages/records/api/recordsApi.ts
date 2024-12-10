import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Token = import.meta.env.VITE_TOKEN;

export interface InterviewRecordUpdateDTO {
    enterpriseName:	string
    category:	string
}

export interface InterviewRecordCreateDTO {
    enterpriseName:	string
    category:	string
    details: RecordDetailCreateDTO[];
}

export interface RecordDetailCreateDTO {
    question: string
    answer: string
}

export interface RecordDetailResponseDTO {
    question: string;
    answer: string;
}

export interface InterviewRecordResponseDTO {
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    details: RecordDetailResponseDTO[];
}

export interface InterviewRecordSidebarDTO {
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export const fetchSidebarData = async (): Promise<{ id: string; enterpriseName: string; category: string }[]> => {
    const response = await axios.get(`${SERVER_URL}/records/sidebar`, {
        headers: { Authorization: `Bearer ${Token}` },
    });
    return response.data;
};

export const fetchRecordDetails = async (id: string): Promise<InterviewRecordResponseDTO> => {
    const response = await axios.get(`${SERVER_URL}/records/interview${id}`, {headers:{'Authorization': `Bearer ${Token}`}});
    return response.data;
};

export const updateRecordDetails = async (id: string, data: InterviewRecordUpdateDTO) => {
    await axios.put(`${SERVER_URL}/records/${id}`, data, {headers:{'Authorization': `Bearer ${Token}`, "Content-Type": "application/json"}});};

export const createRecord = async (data: InterviewRecordCreateDTO) => {
    await axios.post(`${SERVER_URL}/records/interview`, data, {headers:{'Authorization': `Bearer ${Token}`, "Content-Type": "application/json"}});};

export const fetchRecords = async (enterpriseName: string): Promise<Record<string, InterviewRecordResponseDTO>> => {
    const response = await axios.get(`${SERVER_URL}/records/interview`, {params:{enterpriseName:enterpriseName}, headers:{'Authorization': `Bearer ${Token}`}});    return response.data;
};