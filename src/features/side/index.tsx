import { useQuery } from "@tanstack/react-query";
import { Text, Box } from "@chakra-ui/react";

import { usePagenation } from "./hook/usePagenation";
import { fetchSidebarData } from "./api/sideApi";
import { PopoverLayout, SideItem, PaginateControl } from "./ui";

const Sidebar = () => {
    const { data, isError, error } = useQuery({
        queryKey: ["side"],
        queryFn: fetchSidebarData,
        refetchOnWindowFocus: false,
    });

    const formattedMenuItems = data?.map((item) => ({
        id: item.interviewRecordId,
        label: `${item.enterpriseName} | ${item.category}`,
    }));

    const pagination = usePagenation<{ id: string; label: string }>(
        formattedMenuItems || [],
    );

    return (
        <PopoverLayout>
            <Box minHeight="400px">
                {pagination.paginatedItems.map((item) => (
                    <SideItem item={item} key={item.id} />
                ))}
                {isError && <Text color="red.500">{error.message}</Text>}
            </Box>
            <PaginateControl {...pagination} />
        </PopoverLayout>
    );
};

export default Sidebar;
