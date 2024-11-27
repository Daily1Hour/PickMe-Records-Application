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

type MenuItem = {
    label: string;
    icon: React.ReactNode;
};

// 메뉴 데이터
const menuItems: MenuItem[] = [
    { label: "회사명 | 면접유형", icon: <FiClipboard /> },
];

import { useRef } from "react";
import { FiClipboard } from "react-icons/fi";
// 사이드바 컴포넌트
const Sidebar: React.FC = () => {
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
                    {menuItems.map((item, index) => (
                        <Flex
                            key={index}
                            align="center"
                            p="2"
                            rounded="md"
                            _hover={{ bg: "gray.700" }}
                            cursor="pointer"
                        >
                            {item.icon}
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
