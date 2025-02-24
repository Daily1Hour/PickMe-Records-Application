import { object, string, InferType, array } from 'yup';

const detailSchema = object({
    question: string().required(),
    answer: string().required()
});

export const RecordSchema = object({
    enterpriseName: string().required(),
    category: string().required(),
    details: array().of(detailSchema).ensure().required()
});

export type RecordType = InferType<typeof RecordSchema>;