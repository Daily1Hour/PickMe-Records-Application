import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ChakraProvider } from "../shared/chakra-ui/provider";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const queryClient = new QueryClient();

function App() {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export default App;
