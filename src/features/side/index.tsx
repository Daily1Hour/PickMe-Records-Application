import { useQuery } from "@tanstack/react-query";
import { Text } from "@chakra-ui/react";
import {
    DrawerLayout,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    PaginateController,
} from "@styleguide/react";

import { Summary } from "@/entities/records/model/Summary";
import { usePagination } from "./hook/usePagination";
import { fetchSidebarData } from "./api/sideApi";
import { Item } from "./ui";

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
            <DrawerHeader>
                <Text textStyle="xl" fontWeight="semibold">
                    목록
                </Text>
            </DrawerHeader>

            <DrawerBody>
                {paginatedItems.map((item) => (
                    <Item item={item} key={item.id} />
                ))}
                {isError && <Text color="red.500">{error.message}</Text>}
            </DrawerBody>

            <DrawerFooter>
                <PaginateController
                    {...{ handlePageChange, currentPage, totalPages }}
                />
            </DrawerFooter>
        </DrawerLayout>
    );
};

export default Sidebar;
