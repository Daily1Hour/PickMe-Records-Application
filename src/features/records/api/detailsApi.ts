import { Detail, Record } from "@/entities/records/model/Record";
import {
    InterviewRecordResponseDTO,
    RecordDetailCreateDTO,
} from "@/features/records/api/recordsDTOList";
import axios from "axios";
import { dtoToRecord } from "../service/dtoToRecord";
import { recordToCreateDTO, recordToUpdateDTO } from "../service/reocrdToDto";
import { detailToDto } from "../service/detailToDto";

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

    return dtoToRecord(response.data);
};

export const createDetail = async (
    interviewRecordId: string,
    data: RecordDetailCreateDTO,
) => {
    const response = await client.post(
        `/interview/${interviewRecordId}/detail`,
        data,
    );
    return response.data;
};

export const deleteDetail = async (
    interviewRecordId: string,
    detailIndex: number,
) => {
    const response = await client.delete(
        `/interview/${interviewRecordId}/detail/${detailIndex}`,
    );
    return response.data;
};

export const createRecord = async (
    data: Record,
): Promise<{ interviewRecordId: string }> => {
    try {
        const dto = recordToCreateDTO(data);

        const response = await client.post(`/interview`, dto);
        return response.data;
    } catch (error) {
        console.error("Error in updateRecord:", error);
        throw error;
    }
};

export const updateRecord = async (
    interviewRecordId: string,
    data: Record,
): Promise<InterviewRecordResponseDTO> => {
    try {
        const dto = recordToUpdateDTO(data);

        const response = await client.put(
            `/interview/${interviewRecordId}`,
            dto,
        );
        return response.data;
    } catch (error) {
        console.error("Error in updateRecord:", error);
        throw error;
    }
};

export const updateDetail = async (
    interviewRecordId: string,
    detailIndex: number,
    payload: Detail,
) => {
    try {
        const dto = detailToDto(payload);

        const response = await client.put(
            `/interview/${interviewRecordId}/detail/${detailIndex}`,
            dto,
        );
        return response.data;
    } catch (error) {
        console.error("Error in updateDetail:", error);
        throw error;
    }
};
