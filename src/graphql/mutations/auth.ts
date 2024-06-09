import { gql } from '@apollo/client';

const DO_LOGIN = gql`
    mutation login($identifier: String!, $password: String!) {
        login(input: { identifier: $identifier, password: $password }) {
            jwt
            user {
                id
                username
                email
                blocked
            }
        }
    }
`;

export { DO_LOGIN };
