import {
    PopoverRoot,
    PopoverTrigger,
    Text,
    Button,
    PopoverContent,
    PopoverHeader,
    Flex,
    PopoverArrow,
    PopoverBody,
    PopoverCloseTrigger,
} from "@chakra-ui/react";
import { GrFormAdd } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";

import { ReactNode } from "react";

export default function PopoverLayout({ children }: { children: ReactNode }) {
    return (
        <PopoverRoot>
            <PopoverTrigger asChild position="fixed">
                <Button size="sm" variant="outline">
                    <RxHamburgerMenu />
                </Button>
            </PopoverTrigger>
            <PopoverContent position="fixed" mt="10">
                <PopoverHeader>
                    <Flex justify="space-between" align="center">
                        <Text>목록</Text>
                        <NavLink to={`/`}>
                            <Button
                                bg="none"
                                color="gray"
                                _hover={{ bg: "gray.100" }}
                                title="작성하기"
                            >
                                <GrFormAdd />
                            </Button>
                        </NavLink>
                    </Flex>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody>{children}</PopoverBody>
                <PopoverCloseTrigger />
            </PopoverContent>
        </PopoverRoot>
    );
}
