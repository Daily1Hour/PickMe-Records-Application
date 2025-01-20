import { Record } from "@/entities/records/model/Record";
import {
    InterviewRecordCreateDTO,
    InterviewRecordUpdateDTO,
} from "../api/recordsDTOList";

export function recordToCreateDTO(record: Record) {
    return {
        enterpriseName: record.enterpriseName,
        category: record.category,
        details: record.details.map(({ question, answer }) => ({
            question,
            answer,
        })),
    } as InterviewRecordCreateDTO;
}

export function recordToUpdateDTO(record: Record) {
    return {
        enterpriseName: record.enterpriseName,
        category: record.category,
    } as InterviewRecordUpdateDTO;
}
