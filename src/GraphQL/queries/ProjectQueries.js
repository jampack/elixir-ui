import gql from 'graphql-tag';
import PaginatorInfoFragment from '@/GraphQL/Fragments/PaginatorFragment';

// eslint-disable-next-line import/prefer-default-export
export const ProjectsQuery = gql`
  query GetUsersQuery( $first: Int, $page: Int, $statusOrder: SortOrder!, $updatedAtOrder: SortOrder!){
    projects(
      first: $first,
      page: $page,
      orderBy: [{ field: STATUS, order: $statusOrder }, { field: UPDATED_AT, order: $updatedAtOrder }]
    ){
      paginatorInfo{
        ...PaginatorInfo
      }
      data {
        id
        name
        description
        status {
          id
          name
        }
        slug
        owner {
          id
          name
        }
        users {
          paginatorInfo{
            ...PaginatorInfo
          }
          data {
            id
            name
          }
        }
      }
    }
  }
  ${PaginatorInfoFragment}
`;
