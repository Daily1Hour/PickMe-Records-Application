import { IconButton } from "@chakra-ui/react";
import { FaXmark } from "react-icons/fa6";

import useRecordMutation from "../hook/useRecordMutation";

export default function DeleteRecord({
    interviewRecordId,
    detailIndex,
}: {
    interviewRecordId: string;
    detailIndex: number;
}) {
    const { deleteDetailMutation } = useRecordMutation();

    const handleDeleteDetail = async (detailIndex: number) => {
        try {
            deleteDetailMutation({
                interviewRecordId,
                detailIndex,
            });
        } catch (error) {
            console.error("Failed to delete detail:", error);
        }
    };

    return (
        <IconButton
            variant="outline"
            size="sm"
            onClick={() => handleDeleteDetail(detailIndex)}
        >
            <FaXmark />
        </IconButton>
    );
}
