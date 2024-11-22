import React, { useState } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FiChevronRight, FiChevronLeft, FiClipboard } from "react-icons/fi";

// 사이드바 메뉴 항목의 타입 정의
type MenuItem = {
  label: string;
  icon: React.ReactNode;
};

// 메뉴 데이터
const menuItems: MenuItem[] = [
  { label: "회사명 | 면접유형", icon: <FiClipboard /> }
];

// 사이드바 컴포넌트
const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // 사이드바 접힘 상태 관리

  return (
    <Flex h="50vh" w="300px" position="fixed">
      {/* 사이드바 */}
      <IconButton
            aria-label="Toggle Sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
            bg="transparent"
            color="white"
            position="absolute"
            _hover={{ bg: "gray.700" }}>
            {isCollapsed ?<FiChevronRight /> : <FiChevronLeft />}
            </IconButton>
      <Box
        as="nav"
        w={isCollapsed ? "100px" : "250px"} // 접힘 상태에 따라 폭 변경
        visibility={isCollapsed? "hidden":"visible"}
        bg="gray.800"
        color="white"
        p="4"
        transition="width 0.3s"
      >
        <Text fontSize="2xl" fontWeight="bold" mb="6" placeSelf="center" >
          목록
        </Text>
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
      </Box>
    </Flex>
  );
};

export default Sidebar;