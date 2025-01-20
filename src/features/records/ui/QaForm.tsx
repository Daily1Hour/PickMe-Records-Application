import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, VStack } from "@chakra-ui/react";

import { QaField } from "./QaField";
import { AddDetail } from "./AddDetail";
import { DeleteDetail } from "./DeleteDetail";
import { Detail } from "@/entities/records/model/Record";

export const QaForm: React.FC<{
    details: Detail[];
    recordId: string;
}> = ({ details, recordId }) => {
    const name = "details";
    const { resetField } = useFormContext();
    const { fields, append } = useFieldArray({
        name,
    });

    useEffect(() => {
        resetField(name, { defaultValue: details });
    }, [details, resetField, name]);

    return (
        <VStack align="stretch">
            {fields.map((field, detailIndex) => (
                <Box
                    key={field.id}
                    m={5}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                >
                    <QaField name={name} detailIndex={detailIndex} />
                    <DeleteDetail
                        recordId={recordId}
                        detailIndex={detailIndex}
                    />
                </Box>
            ))}
            <AddDetail recordId={recordId} append={append} />
        </VStack>
    );
};
