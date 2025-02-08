import { useFieldArray } from "react-hook-form";
import { Box } from "@chakra-ui/react";
import List from "@styleguide/List";

import { QaField } from "./QaField";
import { AddDetail } from "./AddDetail";
import { DeleteDetail } from "./DeleteDetail";

export const QaForm = () => {
    const name = "details";
    const { fields, append } = useFieldArray({
        name,
    });

    return (
        <>
            <List bordered separator>
                {fields.map((field, detailIndex) => (
                    <Box p="16px" w="100%" key={field.id}>
                        <QaField name={name} detailIndex={detailIndex} />
                        <DeleteDetail detailIndex={detailIndex} />
                    </Box>
                ))}
            </List>
            <AddDetail append={append} />
        </>
    );
};
