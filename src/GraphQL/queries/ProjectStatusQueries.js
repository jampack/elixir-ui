import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const ProjectStatusQuery = gql`
  query GetProjectStatusesQuery{
    projectStatuses{
      id
      name
      description
    }
  }
`;
