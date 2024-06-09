import { PropsWithChildren, useMemo } from 'react';
import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
    const client = useMemo(() => {
        const authMiddleware = setContext(async (operation, { headers }) => {
            const session = await getSession();

            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${session?.user.token}`,
                },
            };
        });

        return new ApolloClient({
            link: from([authMiddleware, httpLink]),
            cache: new InMemoryCache(),
        });
    }, []);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
