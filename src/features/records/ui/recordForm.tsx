import { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Stack, Heading, Button, Input, HStack, Box } from "@chakra-ui/react";

import QAForm from "./QAForm";
import {
    InterviewRecordCreateDTO,
    InterviewRecordUpdateDTO,
} from "../api/recordsDTOList";
import { createRecord, updateRecord, updateDetail } from "../api/detailsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FormDataValues {
    enterpriseName: string;
    category: string;
    details: { question: string; answer: string }[];
}

const RecordForm: React.FC<{
    recordValues: FormDataValues;
    recordId?: string;
}> = ({ recordValues: formValues, recordId: interviewRecordId }) => {
    const [recordId, setRecordId] = useState(interviewRecordId || null); // recordId가 null로 초기화됩니다.
    const methods = useForm<FormDataValues>({
        defaultValues: {
            enterpriseName: "",
            category: "",
            details: [{ question: "", answer: "" }],
        },
    });

    const { reset } = methods;

    const queryclient = useQueryClient();

    const { mutate: update } = useMutation({
        mutationFn: ({
            recordId,
            updatedPayload,
        }: {
            recordId: string;
            updatedPayload: InterviewRecordUpdateDTO;
        }) => updateRecord(recordId, updatedPayload),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
        },
    });

    useEffect(() => {
        reset(formValues);
    }, [formValues, reset]);

    const onSubmit = async (data: FormDataValues) => {
        try {
            if (recordId === null) {
                // recordId가 null일 때 새로운 레코드 생성
                const payload: InterviewRecordCreateDTO = {
                    enterpriseName: data.enterpriseName,
                    category: data.category,
                    details: data.details.map((q) => ({
                        question: q.question,
                        answer: q.answer,
                    })),
                };

                const newRecord = await createRecord(payload);
                setRecordId(newRecord.interviewRecordId); // 새로운 레코드가 생성되면 ID를 설정
                alert("저장했습니다.");
            } else {
                // 기존 레코드 수정

                const updatedPayload: InterviewRecordUpdateDTO = {
                    enterpriseName: data.enterpriseName,
                    category: data.category,
                };

                update({ recordId, updatedPayload });

                for (let i = 0; i < data.details.length; i++) {
                    const detail = data.details[i];
                    await updateDetail(recordId, i, detail);
                }

                alert("수정했습니다.");
            }
        } catch (error) {
            console.error("Error processing the record:", error);
            alert("Failed to process the record.");
        }
    };

    return (
        <Box>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "800px", height: "500px", padding: "20px" }}
                >
                    <Stack>
                        <Heading>내 기록</Heading>
                        <Stack gap="10">
                            <Controller
                                name="enterpriseName"
                                control={methods.control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        variant="flushed"
                                        placeholder="회사 이름"
                                    />
                                )}
                            />
                            <Controller
                                name="category"
                                control={methods.control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        variant="flushed"
                                        placeholder="면접 유형"
                                    />
                                )}
                            />
                        </Stack>
                        <QAForm
                            name="details"
                            details={formValues.details || []}
                            interviewRecordId={recordId || ""}
                        />
                        <HStack justifyContent="flex-end">
                            <Button
                                m="20px"
                                type="submit"
                                bg="#009A6E"
                                borderRadius="30px"
                                w="100px"
                            >
                                {recordId ? "수정" : "저장"}
                            </Button>
                        </HStack>
                    </Stack>
                </form>
            </FormProvider>
        </Box>
    );
};

export default RecordForm;
