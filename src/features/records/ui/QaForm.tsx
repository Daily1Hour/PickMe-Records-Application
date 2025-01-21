import { Box, VStack } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";

import { AddDetail } from "./AddDetail";
import { DeleteDetail } from "./DeleteDetail";
import { QaField } from "./QaField";

export const QaForm: React.FC<{
    recordId: string;
}> = ({ recordId }) => {
    console.log("QaForm")
    const name = "details";
    const { fields, append } = useFieldArray({ name });

    // useEffect(() => {
    //     resetField(name, { defaultValue: details });
    // }, [details, resetField]);

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
