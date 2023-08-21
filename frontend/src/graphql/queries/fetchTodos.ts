import { gql } from '@apollo/client';

export const FETCH_TODOS = gql`
    query GetTodos {
        getTodos {
            _id
            title
            completed
            createdAt
            updatedAt
        }
    }
`;