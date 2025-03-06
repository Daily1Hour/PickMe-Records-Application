import { Summary } from "@/entities/records/model";
import { InterviewRecordSidebarDTO } from "@/features/records/api/recordsDTOList";

export function dtoToSide(dto: InterviewRecordSidebarDTO[]) {
    return dto.map((item) => new Summary(
        item.interviewRecordId,
        item.enterpriseName,
        item.category,
        item.createdAt,
        item.updatedAt
    ));
}