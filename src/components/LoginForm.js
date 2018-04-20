import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!) {
    login(email: $email)
  }
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render = () => (
    <Query query={IS_LOGGED_IN}>
      {({ data: { isLoggedIn }, client }) => (
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={({ login }) => {
            localStorage.setItem('token', login);
            client.writeData({ data: { isLoggedIn: true } });
          }}
        >
          {login => (
            <div style={styles.container}>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    client.writeData({ data: { isLoggedIn: false } });
                    localStorage.clear();
                  }}
                >
                  Log Out
                </button>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const email = this.input.current.value;
                    login({
                      variables: { email },
                    });
                  }}
                >
                  <input type="text" ref={this.input} placeholder="Email" />
                  <button className="button">Log in</button>
                </form>
              )}
            </div>
          )}
        </Mutation>
      )}
    </Query>
  );
}

const styles = {
  container: { marginBottom: 16, width: '100%', textAlign: 'right' },
};
