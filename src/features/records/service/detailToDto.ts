import { RecordDetailUpdateDTO } from "../api/recordsDTOList";
import { Detail } from "@/entities/records/model/Detail";

export function detailToDto(detail: Detail) {
    return {
        question: detail.question,
        answer: detail.answer,
    } as RecordDetailUpdateDTO;
}
