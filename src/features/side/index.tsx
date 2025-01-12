import { useQuery } from "@tanstack/react-query";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormPrevious, GrFormNext, GrFormAdd } from "react-icons/gr";
import {
    Button,
    PopoverArrow,
    PopoverBody,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverRoot,
    PopoverTrigger,
    Text,
    Flex,
    HStack,
    Box,
} from "@chakra-ui/react";

import { usePagenation } from "./hook/usePagenation";
import { fetchSidebarData } from "./api/sideApi";
import { NavLink } from "react-router-dom";
import SideItem from "./ui/SideItem";

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

    const { paginatedItems, handlePageChange, currentPage, totalPages } =
        usePagenation<{ id: string; label: string }>(formattedMenuItems || []);

    return (
        <PopoverRoot>
            <PopoverTrigger asChild position="fixed">
                <Button size="sm" variant="outline">
                    <RxHamburgerMenu />
                </Button>
            </PopoverTrigger>
            <PopoverContent position="fixed" mt="10">
                <PopoverHeader>
                    <Flex justify="space-between" align="center">
                        <Text>목록</Text>
                        <NavLink to={`/`}>
                            <Button
                                bg="none"
                                color="gray"
                                _hover={{ bg: "gray.100" }}
                                title="작성하기"
                            >
                                <GrFormAdd />
                            </Button>
                        </NavLink>
                    </Flex>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                    <Box minHeight="400px">
                        {paginatedItems.map((item) => (
                            <SideItem item={item} key={item.id} />
                        ))}
                        {isError && (
                            <Text color="red.500">{error.message}</Text>
                        )}
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
                </PopoverBody>
                <PopoverCloseTrigger />
            </PopoverContent>
        </PopoverRoot>
    );
};

export default Sidebar;
