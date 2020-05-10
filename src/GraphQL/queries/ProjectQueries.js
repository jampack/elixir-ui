import gql from 'graphql-tag';
import PaginatorInfoFragment from '@/GraphQL/Fragments/PaginatorFragment';


export const GetProjectBySlugQuery = gql`
  query GetProjectBySlugQuery($slug: String!){
    projectBySlug(slug: $slug){
      id
      name
      slug
    }
  }
`;

export const GetProjectsQuery = gql`
  query GetProjectsQuery( $first: Int, $page: Int, $statusOrder: SortOrder!, $updatedAtOrder: SortOrder!){
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

export const ProjectBySlugWithBoardsQuery = gql`
  query GetProjectBySlugWithBoardsQuery( $slug: String!){
    projectBySlug(
      slug: $slug
    ){
      id
      name
      boards{
        paginatorInfo{
          ...PaginatorInfo
        }
        data{
          id
          name
          master_board
        }
      }
    }
  }
  ${PaginatorInfoFragment}
`;
