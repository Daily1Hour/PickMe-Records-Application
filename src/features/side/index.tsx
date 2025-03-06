import { MdAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@chakra-ui/react";
import {
    DrawerLayout,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    PaginateController,
    IconButton,
    List,
    Item,
} from "@styleguide/react";

import { Summary } from "@/entities/records/model";
import { usePagination } from "./hook/usePagination";
import { fetchSidebarData } from "./api/sideApi";

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
        usePagination<{
            id: string;
            label: string;
        }>(formattedMenuItems || []);

    return (
        <DrawerLayout>
            <DrawerHeader>
                <Text textStyle="xl" fontWeight="semibold">
                    목록
                </Text>
            </DrawerHeader>

            <DrawerBody>
                <List separator>
                    <Item justify="center" as={NavLink} to={`/`}>
                        <IconButton size="xs" title="작성하기">
                            <MdAdd />
                        </IconButton>
                    </Item>

                    {paginatedItems.map((item) => (
                        <Item key={item.id} as={NavLink} to={`/${item.id}`}>
                            <Text m={3}>{item.label}</Text>
                        </Item>
                    ))}
                    {isError && <Text color="red.500">{error.message}</Text>}
                </List>
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
