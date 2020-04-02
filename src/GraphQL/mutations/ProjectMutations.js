import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CreateProjectMutation = gql`
  mutation CreateProjectMutation( $name: String!, $description: String, $status_id: ID! ){
    createProject(data: { name: $name, description: $description, status_id: $status_id }) {
      id
      name
      description
      owner {
        name
      }
    }
  }
`;
