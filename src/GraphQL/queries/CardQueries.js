import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CardTaskTypesQuery = gql`
  query GetCardTaskTypes($boardId: ID!) {
    cardTaskTypes(board_id: $boardId){
      id
      name
      description
    }
  }
`;
