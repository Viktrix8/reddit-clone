import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://cachoeiradosul.stepzen.net/api/broken-alpaca/__graphql",
    headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
    },
    cache: new InMemoryCache(),
});

export default client;