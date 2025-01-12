import axios from "axios";

import { InterviewRecordSidebarDTO } from "@/features/records/api/recordsDTOList";
import Summary from "@/entities/summary/model/Summary";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const client = axios.create({
    baseURL: `${SERVER_URL}/records`,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const fetchSidebarData = async (): Promise<Summary[]> => {
    const response = await client.get<InterviewRecordSidebarDTO[]>("/sidebar");

    const records = response.data.map(
        ({
            interviewRecordId,
            enterpriseName,
            category,
            createdAt,
            updatedAt,
        }) =>
            new Summary(
                interviewRecordId,
                enterpriseName,
                category,
                createdAt,
                updatedAt,
            ),
    );

    return records;
};

export const deleteRecord = async (interviewRecordId: string) => {
    const response = await client.delete(`/interview/${interviewRecordId}`);
    return response.data;
};
