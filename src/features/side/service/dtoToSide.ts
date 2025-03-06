import { Summary } from "@/entities/records/model";

export interface InterviewRecordSidebarDTO {
    interviewRecordId: string;
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export function dtoToSide(dto: InterviewRecordSidebarDTO[]) {
    return dto.map(
        (item) =>
            new Summary(
                item.interviewRecordId,
                item.enterpriseName,
                item.category,
                item.createdAt,
                item.updatedAt,
            ),
    );
}
