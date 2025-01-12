import { HStack, Button, Text } from "@chakra-ui/react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function PaginateControl({
    currentPage,
    totalPages,
    handlePageChange,
}: {
    currentPage: number;
    totalPages: number;
    handlePageChange: (direction: "next" | "prev") => void;
}) {
    return (
        <HStack mt={4} justify="space-between">
            <Button
                size="sm"
                bg="none"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 0}
            >
                <GrFormPrevious color="black" />
            </Button>
            <Text>
                {currentPage + 1} / {totalPages}
            </Text>
            <Button
                size="sm"
                bg="none"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages - 1}
            >
                <GrFormNext color="black" />
            </Button>
        </HStack>
    );
}
