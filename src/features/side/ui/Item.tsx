import { Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Item = ({ item }: { item: { id: string; label: string } }) => {
    return (
        <NavLink to={`/${item.id}`}>
            <Flex
                key={item.id}
                align="center"
                p="2"
                rounded="md"
                title={item.label}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
            >
                <Text ml="4" minWidth="200px">
                    {item.label}
                </Text>
            </Flex>
        </NavLink>
    );
};
