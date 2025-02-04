import { ReactNode } from "react";
import { GrFormAdd } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import {
    Button,
    Flex,
    Text,
    DrawerRoot,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseTrigger,
} from "@chakra-ui/react";

export const DrawerLayout = ({ children }: { children: ReactNode }) => {
    return (
        <DrawerRoot placement="start">
            <DrawerTrigger asChild position="fixed">
                <Button size="sm" variant="outline">
                    <RxHamburgerMenu />
                </Button>
            </DrawerTrigger>
            <DrawerContent position="fixed" minHeight="100vh">
                <DrawerHeader>
                    <Flex justify="space-between" align="center">
                        <DrawerCloseTrigger>
                            <Button bg="none" color="gray">
                                <RxHamburgerMenu />
                            </Button>
                        </DrawerCloseTrigger>
                        <Text>목록</Text>
                        <NavLink to={`/`}>
                            <Button bg="none" color="gray" title="작성하기">
                                <GrFormAdd />
                            </Button>
                        </NavLink>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
        </DrawerRoot>
    );
};
