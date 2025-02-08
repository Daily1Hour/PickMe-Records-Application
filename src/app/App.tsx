import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import chakraUiSystem from "@styleguide/chakra-ui-system";

import router from "./router";

const queryClient = new QueryClient();

function App() {
    return (
        <ChakraProvider value={chakraUiSystem}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export default App;
