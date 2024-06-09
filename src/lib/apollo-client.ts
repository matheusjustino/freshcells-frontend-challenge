import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
    concat,
} from '@apollo/client';

const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    return forward(operation);
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false,
    }),
    link: concat(authMiddleware, httpLink),
});
