import { ChakraProvider, theme } from "@chakra-ui/react";
import { createClient } from "urql";
import { Provider as UrqlProvider } from "urql";

const client = createClient({
  url: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <UrqlProvider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UrqlProvider>
  );
}

export default MyApp;
