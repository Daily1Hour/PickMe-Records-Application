import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ChakraProvider } from "../shared/chakra-ui/provider";
import RecordPage from "../pages/records";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RecordPage />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;