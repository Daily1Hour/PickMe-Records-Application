import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormPrevious, GrFormNext, GrFormClose, GrFormAdd } from "react-icons/gr";
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

type SidebarProps = {
    onSelect: (id: string | null) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { data, isError, error } = useQuery({
        queryKey: ["side"],
        queryFn: fetchSidebarData,
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
        <PopoverRoot initialFocusEl={() => ref.current}>
            <PopoverTrigger asChild position="fixed">
                <Button size="sm" variant="outline">
                    <RxHamburgerMenu />
                </Button>
            </PopoverTrigger>
            <PopoverContent position="fixed" mt="10">
                <PopoverHeader>
                    <Flex justify="space-between" align="center">
                        <Text>목록</Text>
                        <Button
                            bg="none"
                            color="gray"
                            _hover={{ bg: "gray.100" }}
                            onClick={() => {
                                onSelect(null);
                            }}
                        >
                            <GrFormAdd />
                        </Button>
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
                                _hover={{ bg: "gray.100" }}
                                cursor="pointer"
                            >
                                <Text
                                    ml="4"
                                    minWidth="200px"
                                    onClick={() => onSelect(item.id)}
                                >
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
