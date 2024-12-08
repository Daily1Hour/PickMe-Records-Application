import axios from "axios";

const BASE_URL = process.env.VITE_SERVER_URL;
const Token = process.env.VITE_TOKEN;

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

export const fetchSidebarData = async (): Promise<InterviewRecordSidebarDTO[]> => {
    const response = await axios.get(`${BASE_URL}/sidebar`);
    return response.data;
};

// export const fetchRecordDetails = async (id: string): Promise<InterviewRecordResponseDTO> => {
//     const response = await axios.get(`${BASE_URL}/records/${id}`);
//     return response.data;
// };

// export const updateRecordDetails = async (id: string, data: InterviewRecordUpdateDTO) => {
//     await axios.put(`${BASE_URL}/records/${id}`, data);
// };

export const createRecord = async (data: InterviewRecordCreateDTO) => {
    await axios.post(`${BASE_URL}/records/interview`, data, {headers:{'Authorization': `Bearer ${Token}`, "Content-Type": "application/json"}});
    // await fetch('http://localhost:8080/records/interview', { method: "POST", headers: { "Content-Type": "application/json", Authorization:Token }, body: JSON.stringify(data) })
};

export const fetchRecords = async (enterpriseName: string): Promise<Record<string, InterviewRecordResponseDTO>> => {
    const response = await axios.get(`${BASE_URL}/records/interview/`, {params:{enterpriseName:enterpriseName} ,headers:{Authorization:Token}});
    return response.data;
};