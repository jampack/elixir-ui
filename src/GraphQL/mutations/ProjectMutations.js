import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CreateProjectMutation = gql`
  mutation CreateProjectMutation( $name: String!, $description: String ){
    createProject(data: { name: $name, description: $description }) {
      id
      name
      description
      owner {
        name
      }
    }
  }
`;
