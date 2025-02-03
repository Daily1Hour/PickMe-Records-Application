import { useFieldArray } from "react-hook-form";
import { Box, VStack } from "@chakra-ui/react";

import { QaField } from "./QaField";
import { AddDetail } from "./AddDetail";
import { DeleteDetail } from "./DeleteDetail";

export const QaForm = () => {
    const name = "details";
    const { fields, append } = useFieldArray({
        name,
    });

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
                    <DeleteDetail detailIndex={detailIndex} />
                </Box>
            ))}
            <AddDetail append={append} />
        </VStack>
    );
};
