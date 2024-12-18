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
    DialogTrigger,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import { useRef, useState } from "react";
import { deleteRecord } from "../api/recordsApi";

type SidebarProps = {
    menuItems: { label: string; id: string }[];
    onSelect: (id: string) => void;
    itemsPerPage: number;
};

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onSelect, itemsPerPage }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 관리
    const totalPages = Math.ceil(menuItems.length / itemsPerPage); // 총 페이지 수 계산
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null); // 삭제할 기록 ID
    const [isDialogOpen, setDialogOpen] = useState(false); // 삭제 다이얼로그 상태

    const paginatedItems = menuItems.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageChange = (direction: "next" | "prev") => {
        if (direction === "next" && currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = (interviewRecordId: string) => {
        setRecordToDelete(interviewRecordId); // 삭제할 record ID 설정
        setDialogOpen(true); // 다이얼로그 열기
    };

    const handleDeleteConfirmation = async () => {
        if (!recordToDelete) return;

        setLoading(true);
        setError(null);

        try {
            await deleteRecord(recordToDelete);
            alert("삭제했습니다.");
            setRecordToDelete(null); // 삭제한 record ID 초기화
            setDialogOpen(false); // 다이얼로그 닫기
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
                <PopoverHeader>목록</PopoverHeader>
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
                                <Text ml="4" minWidth="200px" onClick={() => onSelect(item.id)}>
                                    {item.label}
                                </Text>
                                <Text ml="auto" color="gray" cursor="pointer" onClick={() => handleDelete(item.id)}>
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
            <DialogRoot open={isDialogOpen} onOpenChange={(e)=>setDialogOpen(e.open)}>
                <DialogContent padding={4} position="fixed" left="500px">
                    <Text>정말 삭제하시겠습니까?</Text>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                취소
                            </Button>
                        </DialogActionTrigger>
                        <Button colorScheme="red" onClick={handleDeleteConfirmation}>
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
