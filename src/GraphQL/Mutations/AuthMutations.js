import gql from 'graphql-tag';


export const LoginMutation = gql`
  mutation($username: String!, $password: String!){
    login(data: {username: $username, password: $password}) {
      access_token
      refresh_token
      expires_in
      user{
        name
        avatar
        role
      }
    }
  }
`;

export const LogoutMutation = gql`
  mutation{
    logout{
      status
    }
  }
`;

export const RefreshTokenMutation = gql`
  mutation($refresh_token: String!){
    refreshToken(data: {refresh_token: $refresh_token}) {
      access_token
      refresh_token
      expires_in
    }
  }
`;
