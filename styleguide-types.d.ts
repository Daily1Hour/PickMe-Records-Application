declare module "@styleguide/global" {
    export {};
}

declare module "@styleguide/react" {
    import {
        SystemContext,
        ButtonProps,
        IconButtonProps,
    } from "@chakra-ui/react";

    const chakraUiSystem: SystemContext;

    const Button: React.FC<ButtonProps>;

    const IconButton: React.FC<IconButtonProps>;

    const List: React.FC<{
        children: React.ReactNode;
        bordered?: boolean;
        separator?: boolean;
    }>;

    const DrawerLayout: React.FC<{ children: React.ReactNode }>;
    const DrawerHeader: React.FC<{ children: React.ReactNode }>;
    const DrawerBody: React.FC<{ children: React.ReactNode }>;
    const DrawerFooter: React.FC<{ children: React.ReactNode }>;

    const PaginateController: React.FC<{
        handlePageChange: (
            direction: "next" | "prev" | "first" | "last",
        ) => void;
        currentPage: number;
        totalPages: number;
    }>;

    export {
        chakraUiSystem,
        Button,
        IconButton,
        List,
        DrawerLayout,
        DrawerHeader,
        DrawerBody,
        DrawerFooter,
        PaginateController,
    };
}
