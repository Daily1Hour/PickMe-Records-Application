import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, HStack, IconButton, VStack } from "@chakra-ui/react";

import QAFormField from "./QAFormField";
import DeleteRecord from "./DeleteRecord";

interface QAFormProps {
    name: string;
    details: { question: string; answer: string }[];
    interviewRecordId: string;
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
                        <DeleteRecord
                            interviewRecordId={interviewRecordId}
                            detailIndex={detailIndex}
                        />
                    </HStack>
                </Box>
            ))}
            {interviewRecordId && ( // recordId가 있을 때만 버튼 표시
                <IconButton bg="#009A6E" onClick={handleAddDetail} w={50}>
                    <FaPlus />
                </IconButton>
            )}
        </VStack>
    );
};

export default QAForm;
