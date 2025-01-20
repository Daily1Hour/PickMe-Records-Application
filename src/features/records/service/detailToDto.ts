import { Detail } from "@/entities/records/model/Record";
import { RecordDetailUpdateDTO } from "../api/recordsDTOList";

export function detailToDto(detail: Detail) {
    return {
        question: detail.question,
        answer: detail.answer,
    } as RecordDetailUpdateDTO;
}
