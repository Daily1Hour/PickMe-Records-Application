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
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import { useRef, useState } from "react";

type SidebarProps = {
    menuItems: { label: string; id: string }[];
    onSelect: (id: string) => void;
    itemsPerPage: number;
};

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onSelect, itemsPerPage }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 관리
    const totalPages = Math.ceil(menuItems.length / itemsPerPage); // 총 페이지 수 계산

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


    return (
        <PopoverRoot initialFocusEl={() => ref.current}>
            <PopoverTrigger asChild position="fixed">
                <Button size="sm" variant="outline">
                    <RxHamburgerMenu/>
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
                            _hover={{ bg: "gray.700" }}
                            cursor="pointer"
                            onClick={() => onSelect(item.id)}>
                            <Text ml="4">{item.label}</Text>
                        </Flex>
                    ))}
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
                            disabled={currentPage === totalPages - 1}>
                            <GrFormNext />
                        </Button>
                    </HStack>
                </PopoverBody>
                <PopoverCloseTrigger />
            </PopoverContent>
        </PopoverRoot>
    );
};

export default Sidebar;
