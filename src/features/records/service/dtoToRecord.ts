import { Detail, Record } from "@/entities/records/model/Record";
import { InterviewRecordResponseDTO } from "../api/recordsDTOList";

export function dtoToRecord(dto: InterviewRecordResponseDTO) {
    return new Record(
        dto.interviewRecordId,
        dto.enterpriseName,
        dto.category,
        dto.createdAt,
        dto.updatedAt,
        dto.details.map(({ question, answer }) => new Detail(question, answer)),
    );
}
