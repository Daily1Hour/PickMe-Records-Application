import { client } from "@/shared/api";
import { Record, Detail } from "@/entities/records/model";
import { RecordType } from "../model/RecordSchema";
import {
    dtoToRecord,
    recordToCreateDTO,
    recordToUpdateDTO,
    detailToDto,
} from "../service";
import {
    InterviewRecordResponseDTO,
    RecordDetailCreateDTO,
} from "./recordsDTOList";

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
