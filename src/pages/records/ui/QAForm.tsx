import { Box, Button, HStack, VStack, Editable } from "@chakra-ui/react";
import { Field } from "../../../shared/chakra-ui/Field";
import EditableControl from "./editable-control";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { useEffect } from "react";
import { createDetail, deleteDetail } from "@/pages/records/api/recordsApi";

interface QAFormProps {
    name: string;
    details: { question: string; answer: string }[];
    interviewRecordId: string | null; // null 허용
}

const QAForm: React.FC<QAFormProps> = ({ name, details, interviewRecordId }) => {
    const { control, resetField } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name,
    });

    useEffect(() => {
        resetField(name, { defaultValue: details });
    }, [details, resetField, name]);

    const handleAddDetail = async () => {
        if (!interviewRecordId) return; // recordId가 없으면 추가 불가

        try {
            const newDetail = { question: "", answer: "" };

            const response = await createDetail(interviewRecordId, newDetail);
            append({
                question: response.question,
                answer: response.answer,
            });
        } catch (error) {
            console.error("Failed to create detail:", error);
        }
    };

    const handleDeleteDetail = async (index: number) => {
        if (!interviewRecordId) return; // recordId가 없으면 삭제 불가

        try {
            await deleteDetail(interviewRecordId, index);
            remove(index);
        } catch (error) {
            console.error("Failed to delete detail:", error);
        }
    };

    return (
        <VStack align="stretch">
            
            {fields.map((field, index) => (
                <Box
                    m={5}
                    key={field.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                >
                    <Field label="면접 질문" my={4}>
                        <Controller
                            name={`${name}.${index}.question`}
                            control={control}
                            render={({ field }) => (
                                <Editable.Root defaultValue={field.value} onSubmit={field.onChange}>
                                    <Editable.Preview>{field.value || "질문을 입력해주세요"}</Editable.Preview>
                                    <Editable.Textarea {...field} h="100px" />
                                    <EditableControl />
                                </Editable.Root>
                            )}
                        />
                    </Field>
                    <Field label="답변">
                        <Controller
                            name={`${name}.${index}.answer`}
                            control={control}
                            render={({ field }) => (
                                <Editable.Root defaultValue={field.value} onSubmit={field.onChange}>
                                    <Editable.Preview>{field.value || "답변을 입력해주세요"}</Editable.Preview>
                                    <Editable.Textarea {...field} h="100px" />
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
                            onClick={() => handleDeleteDetail(index)}
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
