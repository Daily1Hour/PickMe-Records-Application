import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ChakraProvider } from "../shared/chakra-ui/provider";
import Record from "../pages/record";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Record />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;