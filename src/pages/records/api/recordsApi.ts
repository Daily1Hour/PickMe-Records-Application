import axios from "axios";
import { InterviewRecordCreateDTO, InterviewRecordResponseDTO, InterviewRecordUpdateDTO } from "./recordsApiList";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Token = import.meta.env.VITE_TOKEN;

export const fetchSidebarData = async (): Promise<{ id: string; enterpriseName: string; category: string }[]> => {
    const response = await axios.get(`${SERVER_URL}/records/sidebar`, {headers: { Authorization: `Bearer ${Token}` }});
    return response.data;
};

export const fetchRecordDetails = async (ResponseParams: string): Promise<InterviewRecordResponseDTO> => {
    const response = await axios.get(`${SERVER_URL}/records/interview`, {params: ResponseParams, headers:{'Authorization': `Bearer ${Token}`}});
    return response.data;
};

export const updateRecordDetails = async (id: string, data: InterviewRecordUpdateDTO) => {
    await axios.put(`${SERVER_URL}/records/${id}`, data, {headers:{'Authorization': `Bearer ${Token}`, "Content-Type": "application/json"}});};

export const createRecord = async (data: InterviewRecordCreateDTO) => {
    await axios.post(`${SERVER_URL}/records/interview`, data, {headers:{'Authorization': `Bearer ${Token}`, "Content-Type": "application/json"}});};

export const fetchRecords = async (ResponseParams: string): Promise<Record<string, InterviewRecordResponseDTO>> => {
    const response = await axios.get(`${SERVER_URL}/records/interview`, {params: ResponseParams , headers:{'Authorization': `Bearer ${Token}`}});    
    return response.data;
};