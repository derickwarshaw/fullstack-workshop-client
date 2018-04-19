import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_QUERY = gql`
  {
    user @client
  }
`;

const UPDATE_LOCAL_USER_MUTATION = gql`
  mutation updateUser($token: String, $email: String) {
    updateUser(token: $token, email: $email) @client
  }
`;

const AUTHENTICATE_MUTATION = gql`
  mutation authenticate($email: String) {
    authenticate(email: $email)
  }
`;

export default ({ onLoginPress, onLogoutPress }) => (
  <Query query={GET_USER_QUERY}>
    {({ data: { email }, loading, error }) => {
      console.log(email);
      return loading || error || !email ? (
        <div style={styles.container}>
          <input type="text" />
          <button onPress={onLoginPress}>Log In</button>
        </div>
      ) : (
        <div style={styles.container}>
          <p>{email}</p>
          <button onPress={onLogoutPress}>Log Out</button>
        </div>
      );
    }}
  </Query>
);

const styles = {
  container: { marginBottom: 16, width: '100%', textAlign: 'right' },
};
