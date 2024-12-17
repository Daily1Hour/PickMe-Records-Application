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

export const updateRecordDetails = async (id: string, data: InterviewRecordUpdateDTO) => {
    await axios.put(`${SERVER_URL}/records/${id}`, data, {headers:{'Authorization': `Bearer ${TOKEN}`, "Content-Type": "application/json"}});};

export const createRecord = async (data: InterviewRecordCreateDTO) => {
    await axios.post(`${SERVER_URL}/records/interview`, data, {headers:{'Authorization': `Bearer ${TOKEN}`, "Content-Type": "application/json"}});};

export const fetchRecords = async (interviewId: string) => {
    const response = await axios.get(`${SERVER_URL}/records/interview${interviewId}`, {headers:{'Authorization': `Bearer ${TOKEN}`}});    
    return response.data;
};

export const createDetail = async (
    interviewId: string,
    data: RecordDetailCreateDTO
) => {
    const response = await axios.post(
        `${SERVER_URL}/records/interview/${interviewId}/details`, // interviewId를 URL에 포함
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