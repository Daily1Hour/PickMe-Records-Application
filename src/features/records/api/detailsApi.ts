import axios from "axios";

import { accessToken } from "@/shared/api/token";
import {
    InterviewRecordResponseDTO,
    RecordDetailCreateDTO,
} from "@/features/records/api/recordsDTOList";
import { Record } from "@/entities/records/model/Record";
import { Detail } from "@/entities/records/model/Detail";
import { dtoToRecord } from "../service/dtoToRecord";
import { recordToCreateDTO, recordToUpdateDTO } from "../service/reocrdToDto";
import { detailToDto } from "../service/detailToDto";
import { RecordType } from "../model/RecordSchema";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
    baseURL: `${SERVER_URL}/record`,
    headers: {
        Authorization: `Bearer ${accessToken}`,
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

export const deleteRecord = async (interviewRecordId: string) => {
    const response = await client.delete(`/interview/${interviewRecordId}`);
    return response.data;
};

export const createRecord = async (
    data: RecordType,
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
    data: RecordType,
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
