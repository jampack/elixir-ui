import gql from 'graphql-tag';
import PaginatorInfoFragment from '@/GraphQL/Fragments/PaginatorFragment';


export const GetBoardQuery = gql`
  query GetBoardQuery($id: ID!){
    board(id: $id){
      id
      name
      is_master_board
      columns{
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
  ${PaginatorInfoFragment}
`;

export const GetProjectMasterBoard = gql`
  query GetProjectMasterBoard($projectId: ID!){
    projectMasterBoard(id: $projectId){
      id
      name
      is_master_board
      columns {
        paginatorInfo{
          ...PaginatorInfo
        }
        data {
          id
          name
          is_primary
          order
        }
      }
    }
  }
  ${PaginatorInfoFragment}
`;
