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
    DialogContent,
    DialogFooter,
    DialogActionTrigger,
    DialogCloseTrigger,
    DialogRoot,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import { useEffect, useRef, useState } from "react";
import { deleteRecord, fetchSidebarData } from "../api/recordsApi";
import { usePagenation } from "../hook/usePagenation";

type SidebarProps = {
    onSelect: (id: string | null) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
    const [menuItems, setMenuItems] = useState<{ id: string; label: string }[]>(
        [],
    );

    const ref = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { paginatedItems, handlePageChange, currentPage, totalPages } =
        usePagenation<{id:string; label: string}>(menuItems);
    const loadSidebarData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSidebarData();
            const formattedMenuItems = data.map((item) => ({
                id: item.interviewRecordId,
                label: `${item.enterpriseName} | ${item.category}`,
            }));
            setMenuItems(formattedMenuItems);
        } catch (err) {
            setError("Failed to load sidebar data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSidebarData();
    }, []);

    const handleDelete = (interviewRecordId: string) => {
        setRecordToDelete(interviewRecordId);
        setDialogOpen(true);
    };

    const handleDeleteConfirmation = async () => {
        if (!recordToDelete) return;

        setLoading(true);
        setError(null);

        try {
            await deleteRecord(recordToDelete);
            alert("삭제했습니다.");
            setRecordToDelete(null);
            setDialogOpen(false);
        } catch (err) {
            setError("Failed to delete the record.");
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                            size="xs"
                            colorScheme="teal"
                            onClick={() => {
                                onSelect(null);
                            }}
                        >
                            새 폼 추가
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
                                <Text
                                    ml="auto"
                                    color="gray"
                                    cursor="pointer"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    x
                                </Text>
                            </Flex>
                        ))}
                        {error && <Text color="red.500">{error}</Text>}
                    </Box>
                    <HStack mt={4} justify="space-between">
                        <Button
                            size="sm"
                            onClick={() => handlePageChange("prev")}
                            disabled={currentPage === 0}
                        >
                            <GrFormPrevious />
                        </Button>
                        <Text>
                            {currentPage + 1} / {totalPages}
                        </Text>
                        <Button
                            size="sm"
                            onClick={() => handlePageChange("next")}
                            disabled={currentPage === totalPages - 1}
                        >
                            <GrFormNext />
                        </Button>
                    </HStack>
                </PopoverBody>
                <PopoverCloseTrigger />
            </PopoverContent>
            <DialogRoot
                open={isDialogOpen}
                onOpenChange={(e) => setDialogOpen(e.open)}
            >
                <DialogContent padding={4} position="fixed" left="500px">
                    <Text>정말 삭제하시겠습니까?</Text>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                취소
                            </Button>
                        </DialogActionTrigger>
                        <Button
                            colorScheme="red"
                            onClick={handleDeleteConfirmation}
                        >
                            삭제
                        </Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </PopoverRoot>
    );
};

export default Sidebar;
