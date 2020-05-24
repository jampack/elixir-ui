import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const ProjectStatusesQuery = gql`
  query GetProjectStatusesQuery{
    projectStatuses{
      id
      name
      description
    }
  }
`;
