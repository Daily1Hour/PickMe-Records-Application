import axios from "axios";

const BASE_URL = "http://localhost:8080";
const Token= "Bearer eyJraWQiOiIyTVRUdXcwaWlBUnJRODN6WW5JVWs5bVlUUzNtcjV3Qm5JMXBnSGhMRllVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NDQ4OGRmYy1lMGYxLTcwYmEtYTMyOS0yYzBmZGI4YTU0ZDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfUkZ4VENWeHR6IiwiY2xpZW50X2lkIjoiNjAwMTFidDBldjQ2bHBiNTFwYm5wdWdwbjciLCJvcmlnaW5fanRpIjoiMGUxMjYxNGMtY2UyOC00NmIyLTgwNmYtZDFiYWMxZjg4MGVmIiwiZXZlbnRfaWQiOiJlNjkwM2YwMS0yM2RhLTQzYzctOTVmNC00YjAzZTk2ZGRlMmMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzMzMTIyMDg4LCJleHAiOjE3MzM2NDgyMjEsImlhdCI6MTczMzY0NDYyMSwianRpIjoiNzI4YmRiZDktNmJiMS00YzA5LWJkOTctNWJjMGM4Njc0NWI4IiwidXNlcm5hbWUiOiJ0ZXN0dXNlciJ9.tEs9mDVgMXwIfitH69MSQzP01Un0-GlHsKh0_FqsdVQKNXAbw28qRzyP1mEXr7fUkqSCb8LUto2YbFTtIS9gttlzSYxWffm0k3E00OgCafm3F_LdsgLJWRy8GU81jiVnp1Y9jlk2vwR9NwFTA6l-UVe02rTj6e15prub6uHfVskj1dfvRpfGf5VSrFkBU-YhOR1AER-B3Xe82Z43rEHANyPemQN9461S91sOTdCQOChq3jCjfmQpTXINDxZIEMVJRm81TAyNYkITGAlwYNDTsJRTLRccjn6UL9Ox4A9nYx5DkkJEJCURHAUWFIt1lBgZPV2H4BRScnTuTSoQ35FyMA"

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
    // await axios.post(`${BASE_URL}/records/interview`, data, {headers:{Authorization:Token}});
    await fetch('http://localhost:8080/records/interview', { method: "POST", headers: { "Content-Type": "application/json", Authorization:Token }, body: JSON.stringify(data) })
};

export const fetchRecords = async (enterpriseName: string): Promise<Record<string, InterviewRecordResponseDTO>> => {
    const response = await axios.get(`${BASE_URL}/records/interview/`, {params:{enterpriseName:enterpriseName} ,headers:{Authorization:Token}});
    return response.data;
};