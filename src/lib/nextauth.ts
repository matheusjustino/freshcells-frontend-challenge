import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { setCookie } from 'nookies';

// LIBS
import { apolloClient } from './apollo-client';

// INTERFACES
import { IUser } from '@/interfaces/user.interface';

// GRAPHQL
import { DO_LOGIN } from '@/graphql/mutations/auth';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 12,
    },
    jwt: {
        maxAge: 60 * 60 * 12,
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'your@email.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials, req) => {
                if (!credentials) {
                    throw new Error('Invalid data');
                }
                try {
                    const { data } = await apolloClient.mutate<{
                        login: { jwt: string; user: IUser };
                    }>({
                        mutation: DO_LOGIN,
                        variables: credentials,
                    });

                    setCookie(
                        undefined,
                        `next-auth.session-token`,
                        data?.login.jwt as string,
                        {
                            maxAge: 60 * 60 * 12, // 12h
                            path: '/',
                        },
                    );
                    return new Promise((resolve) =>
                        resolve({
                            ...data?.login.user,
                            token: data?.login.jwt,
                        } as IUser),
                    );
                } catch (error: any) {
                    console.error(error);
                    if (
                        error.message.includes('Network Error') ||
                        error.message.includes('connect ECONNREFUSED')
                    ) {
                        throw new Error('Unable to connect to the server');
                    }

                    const errorMsg =
                        error.response?.data.message || error.message || error;

                    throw new Error(errorMsg);
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user = token.user as IUser;
            }
            return session;
        },
    },
};
