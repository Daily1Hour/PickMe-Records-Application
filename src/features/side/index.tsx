import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RxHamburgerMenu } from "react-icons/rx";
import {
    GrFormPrevious,
    GrFormNext,
    GrFormClose,
    GrFormAdd,
} from "react-icons/gr";
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
import { DeleteConfirm } from "./ui/deleteConfirm";
import { fetchSidebarData } from "./api/sideApi";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();
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

    const handleDelete = (interviewRecordId: string) => {
        setRecordToDelete(interviewRecordId);
        setDialogOpen(true);
    };

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
                            <Flex
                                key={item.id}
                                align="center"
                                p="2"
                                rounded="md"
                                title={item.label}
                                _hover={{ bg: "gray.100" }}
                                cursor="pointer"
                                onClick={() => navigate(`/${item.id}`)}
                            >
                                <Text ml="4" minWidth="200px">
                                    {item.label}
                                </Text>
                                <Button
                                    ml="auto"
                                    bg="none"
                                    color="gray"
                                    cursor="pointer"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <GrFormClose />
                                </Button>
                            </Flex>
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
            <DeleteConfirm
                recordToDelete={recordToDelete}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </PopoverRoot>
    );
};

export default Sidebar;
