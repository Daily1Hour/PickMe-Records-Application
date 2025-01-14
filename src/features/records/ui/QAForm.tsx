import { useEffect } from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Box, Button, HStack, VStack, Editable } from "@chakra-ui/react";

import EditableControl from "./EditableControl";
import { createDetail, deleteDetail } from "../api/detailsApi";
import { Field } from "@/shared/chakra-ui/Field";
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { RecordDetailCreateDTO } from "../api/recordsDTOList";

interface QAFormProps {
    name: string;
    details: { question: string; answer: string }[];
    interviewRecordId: string | undefined;
}

const QAForm: React.FC<QAFormProps> = ({
    name,
    details,
    interviewRecordId,
}) => {
    const { control, resetField } = useFormContext();
    const { fields, append,  } = useFieldArray({
        name,
    });

    const queryclient = useQueryClient();

    const { mutateAsync: createDetailMutation } = useMutation({
        mutationFn: ({
            interviewRecordId,
            data,
        }: {
            interviewRecordId: string;
            data: RecordDetailCreateDTO;
        }) => createDetail(interviewRecordId, data),
    });

    const { mutate: deleteDetailMutation } = useMutation({
        mutationFn: ({
            interviewRecordId,
            detailIndex,
        }: {
            interviewRecordId: string;
            detailIndex: number;
        }) => deleteDetail(interviewRecordId, detailIndex),
        onSuccess: ()=> {
            queryclient.refetchQueries({ queryKey: ["record"] });
        }
    });

    useEffect(() => {
        resetField(name, { defaultValue: details });
    }, [details, resetField, name]);

    const handleAddDetail = async () => {
        if (!interviewRecordId) return; // recordId가 없으면 추가 불가

        try {
            const newDetail = { question: "", answer: "" };

            const response = await createDetailMutation({
                interviewRecordId,
                data: newDetail,
            });

            append({
                question: response.question,
                answer: response.answer,
            });
        } catch (error) {
            console.error("Failed to create detail:", error);
        }
    };

    const handleDeleteDetail = async (detailIndex: number) => {
        if (!interviewRecordId) return; // recordId가 없으면 삭제 불가
        try {
            deleteDetailMutation({
                interviewRecordId,
                detailIndex,
            });
        } catch (error) {
            console.error("Failed to delete detail:", error);
        }
    };

    return (
        <VStack align="stretch">
            {fields.map((field, detailIndex) => (
                <Box
                    m={5}
                    key={field.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                >
                    <Field label="면접 질문" my={4}>
                        <Controller
                            name={`${name}.${detailIndex}.question`}
                            control={control}
                            render={({ field }) => (
                                <Editable.Root
                                    defaultValue={field.value}
                                    onSubmit={field.onChange}
                                    onChange={field.onChange}
                                >
                                    <Editable.Preview>
                                        {field.value || "질문을 입력해주세요"}
                                    </Editable.Preview>
                                    <Editable.Textarea h="100px" />
                                    <EditableControl />
                                </Editable.Root>
                            )}
                        />
                    </Field>
                    <Field label="답변">
                        <Controller
                            name={`${name}.${detailIndex}.answer`}
                            control={control}
                            render={({ field }) => (
                                <Editable.Root
                                    defaultValue={field.value}
                                    onSubmit={field.onChange}
                                    onChange={field.onChange}
                                >
                                    <Editable.Preview>
                                        {field.value || "답변을 입력해주세요"}
                                    </Editable.Preview>
                                    <Editable.Textarea h="100px" />
                                    <EditableControl />
                                </Editable.Root>
                            )}
                        />
                    </Field>
                    <HStack justifyContent="flex-end">
                        <Button
                            m={4}
                            bg="none"
                            size="sm"
                            onClick={() => handleDeleteDetail(detailIndex)}
                        >
                            ✖
                        </Button>
                    </HStack>
                </Box>
            ))}
            {interviewRecordId && ( // recordId가 있을 때만 버튼 표시
                <Button bg="#009A6E" onClick={handleAddDetail} w="50px">
                    +
                </Button>
            )}
        </VStack>
    );
};

export default QAForm;
