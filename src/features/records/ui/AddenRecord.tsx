import { IconButton } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";

export default function AddenRecord({
    interviewRecordId,
    name,
}: {
    interviewRecordId: string;
    name: string;
}) {
    const { append } = useFieldArray({ name });

    const handleAddDetail = async () => {
        if (!interviewRecordId) return; // recordId가 없으면 추가 불가

        try {
            append({
                question: "",
                answer: "",
            });
        } catch (error) {
            console.error("Failed to create detail:", error);
        }
    };

    return (
        <IconButton bg="#009A6E" onClick={handleAddDetail} w={50}>
            <FaPlus />
        </IconButton>
    );
}
