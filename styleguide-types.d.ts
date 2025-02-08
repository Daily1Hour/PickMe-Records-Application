declare module "@styleguide/GlobalStyles" {
    export {};
}

declare module "@styleguide/chakra-ui-system" {
    import { SystemContext } from "@chakra-ui/react";
    const chakraUiSystem: SystemContext;
    export default chakraUiSystem;
}

declare module "@styleguide/Button" {
    import { ButtonProps } from "@chakra-ui/react";
    const Button: React.FC<ButtonProps>;
    export default Button;
}

declare module "@styleguide/List" {
    type props = {
        children: React.ReactNode;
        bordered?: boolean;
        separator?: boolean;
    };
    const List: React.FC<props>;
    export default List;
}
