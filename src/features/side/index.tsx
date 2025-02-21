import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { Button, Text, HStack, Box } from "@chakra-ui/react";

import { usePagination } from "./hook/usePagenation";
import { fetchSidebarData } from "./api/sideApi";
import { Item, DrawerLayout } from "./ui";
import { Summary } from "@/entities/records/model/Summary";

const Sidebar = () => {
    const {
        data: summary,
        isError,
        error,
    } = useQuery<Summary[]>({
        queryKey: ["side"],
        queryFn: fetchSidebarData,
        refetchOnWindowFocus: false,
    });

    const formattedMenuItems = summary?.map((item) => ({
        id: item.interviewRecordId,
        label: `${item.enterpriseName} | ${item.category}`,
    }));

    const { paginatedItems, handlePageChange, currentPage, totalPages } =
        usePagination<{ id: string; label: string }>(formattedMenuItems || []);

    return (
        <DrawerLayout>
            <Box minHeight="400px">
                {paginatedItems.map((item) => (
                    <Item item={item} key={item.id} />
                ))}
                {isError && <Text color="red.500">{error.message}</Text>}
            </Box>
            <HStack mt={2} justify="space-between">
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
        </DrawerLayout>
    );
};

export default Sidebar;
