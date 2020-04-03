import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const CreateUserMutation = gql`
  mutation CreateUserMutation($name: String!, $email: Email!, $role: UserRole!){
    createUser(data: {
      name: $name,
      email: $email
      role: $role
      })
     {
        id
        name
    }
  }
`;
