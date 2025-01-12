import axios from "axios";

import Detail from "@/entities/records/model/Detail";
import Record from "@/entities/records/model/Record";
import {
    InterviewRecordResponseDTO,
    RecordDetailCreateDTO,
    InterviewRecordCreateDTO,
    InterviewRecordUpdateDTO,
} from "./recordsDTOList";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const client = axios.create({
    baseURL: `${SERVER_URL}/records`,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const fetchRecordById = async (
    interviewRecordId: string,
): Promise<Record> => {
    const response = await client.get<InterviewRecordResponseDTO>(
        `/interview/${interviewRecordId}`,
    );

    const { enterpriseName, category, details, createdAt, updatedAt } =
        response.data;

    return new Record(
        interviewRecordId,
        enterpriseName,
        category,
        createdAt,
        updatedAt,
        details.map(({ question, answer }) => new Detail(question, answer)),
    );
};

export const createDetail = async ({
    interviewRecordId,
    data,
}: {
    interviewRecordId: string;
    data: RecordDetailCreateDTO;
}) => {
    const response = await client.post(
        `/interview/${interviewRecordId}/detail`,
        data,
    );
    return response.data;
};

export const deleteDetail = async ({
    interviewRecordId,
    detailIndex,
}: {
    interviewRecordId: string;
    detailIndex: number;
}) => {
    const response = await client.delete(
        `/interview/${interviewRecordId}/detail/${detailIndex}`,
    );
    return response.data;
};

export const createRecord = async ({
    data,
}: {
    data: InterviewRecordCreateDTO;
}): Promise<{ interviewRecordId: string }> => {
    const response = await client.post(`/interview`, data);
    return response.data;
};

export const updateDetail = async ({
    interviewRecordId,
    detailIndex,
    payload,
}: {
    interviewRecordId: string;
    detailIndex: number;
    payload: Detail;
}) => {
    try {
        const response = await client.put(
            `/interview/${interviewRecordId}/detail/${detailIndex}`,
            payload,
        );
        return response.data;
    } catch (error) {
        console.error("Error in updateDetail:", error);
        throw error;
    }
};

export const updateRecord = async ({
    interviewRecordId,
    data,
}: {
    interviewRecordId: string;
    data: InterviewRecordUpdateDTO;
}) => {
    try {
        const response = await client.put(
            `/interview/${interviewRecordId}`,
            data,
        );
        return response.data;
    } catch (error) {
        console.error("Error in updateRecord:", error);
        throw error;
    }
};
