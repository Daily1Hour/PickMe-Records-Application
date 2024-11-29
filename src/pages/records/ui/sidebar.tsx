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
} from "@chakra-ui/react";


import { useRef } from "react";

type SidebarProps = {
    menuItems: { label: string; id: string }[];
    onSelect: (id: string) => void;
};

// 사이드바 컴포넌트
const Sidebar: React.FC<SidebarProps> = ({ menuItems, onSelect }) => {
    const ref = useRef<HTMLButtonElement>(null);
    return (
        <PopoverRoot initialFocusEl={() => ref.current}>
            <PopoverTrigger asChild position="fixed">
                <Button size="sm" variant="outline">
                    ☰
                </Button>
            </PopoverTrigger>
            <PopoverContent position="fixed" mt="10">
                <PopoverHeader>목록</PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                    {menuItems.map((item) => (
                        <Flex
                            key={item.id}
                            align="center"
                            p="2"
                            rounded="md"
                            _hover={{ bg: "gray.700" }}
                            cursor="pointer"
                            onClick={() => onSelect(item.id)} // 선택된 ID 전달
                        >
                            <Text ml="4">{item.label}</Text>
                        </Flex>
                    ))}
                </PopoverBody>
                <PopoverCloseTrigger />
            </PopoverContent>
        </PopoverRoot>
    );
};

export default Sidebar;
