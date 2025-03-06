import { GrClose } from "react-icons/gr";
import { HStack, IconButton } from "@chakra-ui/react";

import { useQaMutation } from "../hook/useQaMutation";
import { useRecordStore } from "../store/recodStore";

export const DeleteDetail = ({ detailIndex }: { detailIndex: number }) => {
    const { deleteDetailMutation } = useQaMutation();
    const recordId = useRecordStore((state) => state.record.recordId);

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
};
