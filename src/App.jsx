
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StudentManagement from "./pages/StudentManagement";
import { Toaster } from "sonner";

// Customize Chakra UI theme
const theme = extendTheme({
  colors: {
    brand: {
      50: "#e6f5ec",
      100: "#c1e6d1",
      200: "#9bd7b4",
      300: "#75c896",
      400: "#50b97f",
      500: "#3c9d67", // Primary button color
      600: "#2f7b50",
      700: "#235a3a",
      800: "#163924",
      900: "#08170e",
    },
    danger: {
      500: "#e53e3e", // Delete button color
    },
  },
  fonts: {
    heading: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    body: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Container maxW="container.xl" py={8}>
          <StudentManagement />
        </Container>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
