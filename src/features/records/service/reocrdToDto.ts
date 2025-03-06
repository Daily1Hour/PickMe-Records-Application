import {
    InterviewRecordCreateDTO,
    InterviewRecordUpdateDTO,
} from "../api/recordsDTOList";
import { RecordType } from "../model/RecordSchema";

export function recordToCreateDTO(record: RecordType) {
    return {
        enterpriseName: record.enterpriseName,
        category: record.category,
        details: record.details.map(({ question, answer }) => ({
            question,
            answer,
        })),
    } as InterviewRecordCreateDTO;
}

export function recordToUpdateDTO(record: RecordType) {
    return {
        enterpriseName: record.enterpriseName,
        category: record.category,
    } as InterviewRecordUpdateDTO;
}
