import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const ProjectStatusQuery = gql`
  query{
    projectStatuses{
      id
      name
      description
    }
  }
`;
