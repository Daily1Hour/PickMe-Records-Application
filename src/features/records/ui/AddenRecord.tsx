import { IconButton } from "@chakra-ui/react";
import { FieldValues, UseFieldArrayAppend } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";

export default function AddenRecord({
    append,
}: {
    append: UseFieldArrayAppend<FieldValues, string>;
}) {
    const handleAddDetail = async () => {
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
