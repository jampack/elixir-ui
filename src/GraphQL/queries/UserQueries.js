import gql from 'graphql-tag';
import PaginatorInfoFragment from '@/GraphQL/Fragments/PaginatorFragment';

// eslint-disable-next-line import/prefer-default-export
export const UsersQuery = gql`
  query GetUsersQuery($first: Int, $page: Int, $nameOrder: SortOrder!, $roleOrder: SortOrder!){
    users(
      first: $first,
      page: $page,
      orderBy: [{ field: NAME, order: $nameOrder }, { field: ROLE, order: $roleOrder }]
    ){
      paginatorInfo{
        ...PaginatorInfo
      }
      data{
        id
        name
        role
        email
        avatar
        status
        projects{
          paginatorInfo{
            ...PaginatorInfo
          }
          data{
            id
            name
          }
        }
        teams{
          paginatorInfo{
            ...PaginatorInfo
          }
          data{
            id
            name
            avatar
          }
        }
      }
    }
  }
  ${PaginatorInfoFragment}
`;
