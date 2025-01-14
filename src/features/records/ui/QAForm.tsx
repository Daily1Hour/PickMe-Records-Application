import { useEffect } from "react";
import { GrFormAdd , GrClose } from "react-icons/gr";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import {
    Box,
    HStack,
    VStack,
    Editable,
    IconButton,
} from "@chakra-ui/react";

import { Field } from "@/shared/chakra-ui/Field";
import EditableControl from "./EditableControl";
import { useQaMutation } from "../hook/useQaMutation";

interface QAFormProps {
    name: string;
    details: { question: string; answer: string }[];
    interviewRecordId: string | undefined;
}

export const QAForm: React.FC<QAFormProps> = ({
    name,
    details,
    interviewRecordId,
}) => {
    const { control, resetField } = useFormContext();
    const { fields, append } = useFieldArray({
        name,
    });

    const { createDetailMutation, deleteDetailMutation } = useQaMutation();

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
                        <IconButton
                            m={4}
                            variant={"ghost"}
                            size="sm"
                            onClick={() => handleDeleteDetail(detailIndex)}
                            aria-label="delete"
                        >
                            <GrClose color="grey" />
                        </IconButton>
                    </HStack>
                </Box>
            ))}
            {interviewRecordId && ( // recordId가 있을 때만 버튼 표시
                <IconButton colorPalette="teal" onClick={handleAddDetail} w="50px">
                    <GrFormAdd  />
                </IconButton>
            )}
        </VStack>
    );
};
