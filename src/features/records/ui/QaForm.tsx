import { useEffect } from "react";
import { GrFormAdd, GrClose } from "react-icons/gr";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, HStack, VStack, IconButton } from "@chakra-ui/react";

import { useQaMutation } from "../hook/useQaMutation";
import { QaField } from "./QaField";

interface QaFormProps {
    name: string;
    details: { question: string; answer: string }[];
    interviewRecordId: string | undefined;
}

export const QaForm: React.FC<QaFormProps> = ({
    name,
    details,
    interviewRecordId,
}) => {
    const { resetField } = useFormContext();
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
                    <QaField name={name} detailIndex={detailIndex} />
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
                <IconButton
                    colorPalette="teal"
                    onClick={handleAddDetail}
                    w="50px"
                >
                    <GrFormAdd />
                </IconButton>
            )}
        </VStack>
    );
};
