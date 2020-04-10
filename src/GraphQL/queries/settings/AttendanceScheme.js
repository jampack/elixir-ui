import gql from 'graphql-tag';
import PaginatorInfoFragment from '@/GraphQL/Fragments/PaginatorFragment';

// eslint-disable-next-line import/prefer-default-export
export const AttendanceSchemesQuery = gql`
  query GetAttendanceSchemesQuery{
    attendanceSchemes{
      paginatorInfo{
        ...PaginatorInfo
      }
      data{
        id
        users{
          paginatorInfo{
            ...PaginatorInfo
          }
        }
        name
        planned_leaves
        sick_leaves
        casual_leaves
        work_from_home
      }
    }
  }
  ${PaginatorInfoFragment}
`;
