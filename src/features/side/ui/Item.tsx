import { Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";

export const Item = ({
    item,
    handleDelete,
}: {
    item: { id: string; label: string };
    handleDelete: (interviewRecordId: string) => void;
}) => {
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
    );
};
