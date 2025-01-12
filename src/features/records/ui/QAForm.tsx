import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, HStack, VStack } from "@chakra-ui/react";

import Detail from "@/entities/records/model/Detail";
import QAFormField from "./QAFormField";
import DeleteRecord from "./DeleteRecord";
import AddenRecord from "./AddenRecord";

interface QAFormProps {
    details: Detail[];
    interviewRecordId: string;
}

const QAForm: React.FC<QAFormProps> = ({ details, interviewRecordId }) => {
    const name = "details";
    const { resetField } = useFormContext();
    const { fields, append } = useFieldArray({ name });

    useEffect(() => {
        resetField(name, { defaultValue: details });
    }, [details, resetField, name]);

    return (
        <VStack align="stretch">
            {fields.map((field, detailIndex) => (
                <Box
                    m={5}
                    p={4}
                    key={field.id}
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

            <AddenRecord append={append} />
        </VStack>
    );
};

export default QAForm;
