import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CreateCardMutation = gql`
  mutation CreateCardMutation(
    $title: String!,
    $description: String!,
    $type: CardTypeEnum!
    $taskTypeId: ID
    $boardId: ID!
    $boardColumnId: ID!
  ){
    createCard(data: {
      title: $title,
      description: $description,
      type: $type,
      task_type_id: $taskTypeId,
      board_id: $boardId,
      board_column_id: $boardColumnId
    }){
        id
    }
  }
`;
