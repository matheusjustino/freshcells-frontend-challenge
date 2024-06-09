import { gql } from '@apollo/client';

const GET_USER = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            username
            email
            firstName
            lastName
            blocked
        }
    }
`;

export { GET_USER };
