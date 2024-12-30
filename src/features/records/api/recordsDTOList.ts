export interface InterviewRecordUpdateDTO {
    enterpriseName:	string
    category:	string
}

export interface InterviewRecordResponseDTO {
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    details: RecordDetailResponseDTO[];
}

export interface RecordDetailResponseDTO {
    question: string;
    answer: string;
}

export interface RecordDetailUpdateDTO{
    question: string;    
    answer:	string;    
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

export interface InterviewRecordSidebarDTO {
    interviewRecordId: string;
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}