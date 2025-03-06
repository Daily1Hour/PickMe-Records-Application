import { object, string, InferType, array } from 'yup';

const detailSchema = object({
    question: string().max(1000).required("질문을 입력해주세요"),
    answer: string().max(1000).required()
});

export const RecordSchema = object({
    enterpriseName: string().max(15, "최대 15자 입니다.").required("회사명을 입력해주세요."),
    category: string().required("면접 유형을 입력해주세요."),
    details: array().of(detailSchema).ensure().required()
});

export type RecordType = InferType<typeof RecordSchema>;