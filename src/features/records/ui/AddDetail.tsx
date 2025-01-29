import React from "react";
import { GrFormAdd } from "react-icons/gr";
import { UseFieldArrayAppend, FieldValues } from "react-hook-form";
import { IconButton } from "@chakra-ui/react";

import { useQaMutation } from "../hook/useQaMutation";

export const AddDetail = React.memo(({recordId, append}:{recordId:string, append:UseFieldArrayAppend<FieldValues, string>}) => {

    const { createDetailMutation } = useQaMutation();
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
    return (
        <IconButton colorPalette="teal" onClick={handleAddDetail} w="50px">
            <GrFormAdd />
        </IconButton>
    );
});
