import { useNavigate } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

export default function SideItem({
    item,
}: {
    item: { id: string; label: string };
}) {
    const navigate = useNavigate();

    return (
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
        </Flex>
    );
}
