import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Stack, Heading, Button, Input, HStack, Box } from "@chakra-ui/react";

import QAForm from "./QAForm";
import {
    InterviewRecordCreateDTO,
    InterviewRecordUpdateDTO,
    RecordDetailUpdateDTO,
} from "../api/recordsDTOList";
import { createRecord, updateRecord, updateDetail } from "../api/detailsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface FormDataValues {
    enterpriseName: string;
    category: string;
    details: { question: string; answer: string }[];
}

const RecordForm: React.FC<{
    recordValues: FormDataValues;
    recordId?: string;
}> = ({ recordValues: formValues, recordId }) => {
    const navigate = useNavigate();
    const methods = useForm<FormDataValues>({
        defaultValues: {
            enterpriseName: "",
            category: "",
            details: [{ question: "", answer: "" }],
        },
    });

    const { reset } = methods;

    const queryclient = useQueryClient();
    
    const { mutateAsync: create } = useMutation({
        mutationFn: ({ data }: { data: InterviewRecordCreateDTO }) =>
            createRecord(data),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
        },
    });

    const { mutate: update } = useMutation({
        mutationFn: ({
            recordId,
            updatedata,
        }: {
            recordId: string;
            updatedata: InterviewRecordUpdateDTO;
        }) => updateRecord(recordId, updatedata),
        onSuccess: () => {
            const queryKeys = [["side"], ["record"]]; // 리패치할 쿼리 키들
            queryKeys.forEach((key) => {
                queryclient.refetchQueries({ queryKey: key });
            });
        },
    });

    const { mutate: updateDetailMutation } = useMutation({
        mutationFn: ({
            recordId,
            index,
            detail,
        }: {
            recordId: string;
            index: number;
            detail: RecordDetailUpdateDTO;
        }) => updateDetail(recordId, index, detail),
    });

    useEffect(() => {
        reset(formValues);
    }, [formValues, reset]);

    const onSubmit = async (data: FormDataValues) => {
        try {
            if (! recordId) {
                // recordId가 null일 때 새로운 레코드 생성
                const newRecord = await create({ data });
                navigate(`/${newRecord.interviewRecordId}`)
                alert("저장했습니다.");
            } else {
                // 기존 레코드 수정
                update({ recordId, updatedata: data });
                data.details.forEach((detail, index) => {
                    updateDetailMutation({ recordId, index, detail });
                });
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
                            details={formValues.details}
                            interviewRecordId={recordId}
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
