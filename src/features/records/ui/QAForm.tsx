import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";

import useRecordMutation from "../hook/useRecordMutation";
import QAFormField from "./QAFormField";

interface QAFormProps {
    name: string;
    details: { question: string; answer: string }[];
    interviewRecordId: string | null; // null 허용
}

const QAForm: React.FC<QAFormProps> = ({
    name,
    details,
    interviewRecordId,
}) => {
    const { resetField } = useFormContext();
    const { fields, append } = useFieldArray({
        name,
    });
    const { deleteDetailMutation } = useRecordMutation();

    useEffect(() => {
        resetField(name, { defaultValue: details });
    }, [details, resetField, name]);

    const handleAddDetail = async () => {
        if (!interviewRecordId) return; // recordId가 없으면 추가 불가

        try {
            append({
                question: "",
                answer: "",
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
                    <QAFormField name={name} detailIndex={detailIndex} />
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
