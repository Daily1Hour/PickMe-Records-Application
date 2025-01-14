import { useEffect } from "react";
import { GrFormAdd, GrClose } from "react-icons/gr";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, HStack, VStack, IconButton } from "@chakra-ui/react";

import { useQaMutation } from "../hook/useQaMutation";
import { QaField } from "./QaField";

interface QaFormProps {
    name: string;
    details: { question: string; answer: string }[];
    recordId: string;
}

export const QaForm: React.FC<QaFormProps> = ({ name, details, recordId }) => {
    const { resetField } = useFormContext();
    const { fields, append } = useFieldArray({
        name,
    });

    const { createDetailMutation, deleteDetailMutation } = useQaMutation();

    useEffect(() => {
        resetField(name, { defaultValue: details });
    }, [details, resetField, name]);

    const handleAddDetail = async () => {
        try {
            const newDetail = { question: "", answer: "" };

            const response = await createDetailMutation({
                interviewRecordId: recordId,
                data: newDetail,
            });

            append(response);
        } catch (error) {
            console.error("Failed to create detail:", error);
        }
    };

    const handleDeleteDetail = async (detailIndex: number) => {
        try {
            deleteDetailMutation({
                interviewRecordId: recordId,
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
            <IconButton colorPalette="teal" onClick={handleAddDetail} w="50px">
                <GrFormAdd />
            </IconButton>
        </VStack>
    );
};
