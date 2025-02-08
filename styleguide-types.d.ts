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

    export { chakraUiSystem, Button, IconButton, List };
}
