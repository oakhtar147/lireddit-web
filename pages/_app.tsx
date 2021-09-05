import { ChakraProvider } from "@chakra-ui/react";
import { createClient } from "urql";
import { Provider as UrqlProvider } from "urql";

const client = createClient({
  url: "http://localhost:5000/graphql",
});

function MyApp({ Component, pageProps }) {
  return (
    <UrqlProvider value={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UrqlProvider>
  );
}

export default MyApp;
