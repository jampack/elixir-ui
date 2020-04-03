import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CreateProjectMutation = gql`
  mutation CreateProjectMutation( $name: String!, $description: String, $statusId: ID! ){
    createProject(data: { name: $name, description: $description, status_id: $statusId }) {
      id
      name
      description
      owner {
        name
      }
    }
  }
`;
