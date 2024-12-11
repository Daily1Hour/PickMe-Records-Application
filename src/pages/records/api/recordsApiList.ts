export interface InterviewRecordUpdateDTO {
    enterpriseName:	string
    category:	string
}

export interface InterviewRecordCreateDTO {
    enterpriseName:	string
    category:	string
    details: RecordDetailCreateDTO[];
}

export interface RecordDetailCreateDTO {
    question: string
    answer: string
}

export interface RecordDetailResponseDTO {
    question: string;
    answer: string;
}

export interface InterviewRecordResponseDTO {
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    details: RecordDetailResponseDTO[];
}

export interface InterviewRecordSidebarDTO {
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface ResponseParams {
    enterpriseName: string;
    category: string;
    createdAt: string;
}