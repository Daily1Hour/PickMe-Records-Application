import React from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import { useQaMutation } from "../hook/useQaMutation";

export const DeleteDetail = React.memo( ({
    recordId,
    detailIndex,
}: {
    recordId: string;
    detailIndex: number;
}) => {
    const { deleteDetailMutation } = useQaMutation();

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
    );
});
