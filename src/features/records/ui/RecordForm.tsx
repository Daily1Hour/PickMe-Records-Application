import { useForm, FormProvider } from "react-hook-form";
import { Stack, Heading, Button, HStack, Box } from "@chakra-ui/react";

import QAForm from "./QAForm";
import {
    InterviewRecordCreateDTO,
    InterviewRecordUpdateDTO,
    RecordDetailUpdateDTO,
} from "../api/recordsDTOList";
import { createRecord, updateRecord, updateDetail } from "../api/detailsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FormDataValues from "../model/FormDataValues";
import TitleForm from "./TitleForm";

const RecordForm: React.FC<{
    recordValues: FormDataValues;
    recordId?: string;
}> = ({ recordValues: formValues, recordId }) => {
    const navigate = useNavigate();
    const methods = useForm<FormDataValues>({
        defaultValues: formValues,
    });

    const queryclient = useQueryClient();

    const { mutate: create } = useMutation({
        mutationFn: ({ data }: { data: InterviewRecordCreateDTO }) =>
            createRecord(data),
        onSuccess: ({ interviewRecordId }) => {
            queryclient.refetchQueries({ queryKey: ["side"] });
            navigate(`/${interviewRecordId}`);
        },
    });

    const { mutate: update } = useMutation({
        mutationFn: ({
            recordId,
            data,
        }: {
            recordId: string;
            data: InterviewRecordUpdateDTO;
        }) => updateRecord(recordId, data),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
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

    const onSubmit = async (data: FormDataValues) => {
        try {
            if (!recordId) {
                // recordId가 null일 때 새로운 레코드 생성

                create({ data });
                alert("저장했습니다.");
            } else {
                // 기존 레코드 수정
                update({ recordId, data });
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

                        <TitleForm control={methods.control} />

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
