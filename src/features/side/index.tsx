import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { Button, Text, HStack, Box } from "@chakra-ui/react";

import { usePagination } from "./hook/usePagenation";
import { fetchSidebarData } from "./api/sideApi";
import { PopoverLayout, Item, DeleteConfirm } from "./ui";

const Sidebar = () => {
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { data, isError, error } = useQuery({
        queryKey: ["side"],
        queryFn: fetchSidebarData,
        refetchOnWindowFocus: false,
    });

    const formattedMenuItems = data?.map((item) => ({
        id: item.interviewRecordId,
        label: `${item.enterpriseName} | ${item.category}`,
    }));

    const { paginatedItems, handlePageChange, currentPage, totalPages } =
        usePagination<{ id: string; label: string }>(formattedMenuItems || []);

    const handleDelete = (interviewRecordId: string) => {
        setIdToDelete(interviewRecordId);
        setDialogOpen(true);
    };

    return (
        <PopoverLayout>
            <DeleteConfirm
                recordToDelete={idToDelete}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <Box minHeight="400px">
                {paginatedItems.map((item) => (
                    <Item item={item} handleDelete={handleDelete} />
                ))}
                {isError && <Text color="red.500">{error.message}</Text>}
            </Box>
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
        </PopoverLayout>
    );
};

export default Sidebar;
