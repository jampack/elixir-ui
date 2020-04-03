import gql from 'graphql-tag';

export const LoginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!){
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
  mutation LogoutMutation{
    logout{
      status
    }
  }
`;

export const RefreshTokenMutation = gql`
  mutation RefreshTokenMutation($refreshToken: String!){
    refreshToken(data: {refresh_token: $refreshToken}) {
      access_token
      refresh_token
      expires_in
    }
  }
`;
