import { Box, Button, HStack, VStack, Editable } from "@chakra-ui/react";
import { Field } from "../../../shared/chakra-ui/Field";
import EditableControl from "./editable-control";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { useEffect } from "react";
import { createDetail, deleteDetail } from "@/pages/records/api/recordsApi";

interface QAFormProps {
    name: string;
    details: { question: string; answer: string }[];
    interviewRecordId: string; // 추가: Record ID를 받아 API에 사용
}

const QAForm: React.FC<QAFormProps> = ({ name, details, interviewRecordId }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name,
    });

    useEffect(() => {
        if (details && details.length > 0) {
            details.forEach(detail => append(detail)); // 초기 데이터를 필드에 추가
        }
    }, [details, append]);

    const handleAddDetail = async () => {
        try {
            const newDetail = { question: "", answer: "" };

            const response = await createDetail(interviewRecordId, newDetail);

            append(
                { question: response.question,
                    answer: response.answer,
                }
            ); // 필드 추가

            // 서버의 최신 데이터를 반영하여 폼 상태를 업데이트
        } catch (error) {
            console.error("Failed to create detail:", error);
        }
    };
    
    const handleDeleteDetail = async (index: number) => {
        try {
            // API 호출하여 해당 detail 삭제
            await deleteDetail(interviewRecordId, index);

            // 삭제된 항목을 `remove`로 폼에서 제거
            remove(index);
        } catch (error) {
            console.error("Failed to delete detail:", error);
            alert("Failed to delete question and answer.");
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
                            render={({ field: answerField }) => (
                                <Editable.Root defaultValue={answerField.value} onSubmit={answerField.onChange}>
                                    <Editable.Preview>{answerField.value || "답변을 입력해주세요"}</Editable.Preview>
                                    <Editable.Textarea {...answerField} h="100px" />
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
            <Button bg="#009A6E" onClick={handleAddDetail} w="50px">
                +
            </Button>
        </VStack>
    );
};

export default QAForm;
