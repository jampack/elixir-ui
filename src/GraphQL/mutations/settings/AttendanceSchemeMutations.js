import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CreateAttendanceSchemeMutation = gql`
  mutation CreateAttendanceSchemeMutation(
    $name: String!,
    $sickLeaves: Int,
    $casualLeaves: Int,
    $plannedLeaves: Int,
    $workFromHome: Int )
  {
    createAttendanceScheme(data: {
      name: $name,
      sick_leaves: $sickLeaves,
      casual_leaves: $casualLeaves,
      planned_leaves: $plannedLeaves,
      work_from_home: $workFromHome }) {
      id
    }
  }
`;
