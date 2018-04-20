/*
TODO: Creating a mutation component (part 1):

1. Create a Mutation component to login the user
2. Use the onCompleted prop on Mutation to set whether the user is logged in
*/

/*
TODO: Apollo Link State:

1. Refactor the setState calls to client.writeData calls to set whether the user is logged in
2. Query whether the user is logged in one level above the Mutation component.
*/

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation loginUser($email: String!) {
    login(email: $email)
  }
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();

    const token = localStorage.getItem('token');

    this.state = {
      isLoggedIn: !!token,
    };
  }

  render = () => (
    <Mutation
      mutation={LOGIN_USER}
      onCompleted={({ login }) => {
        localStorage.setItem('token', login);
        this.setState({ isLoggedIn: true });
      }}
    >
      {login => (
        <div style={styles.container}>
          {this.state.isLoggedIn ? (
            <button
              onClick={() => {
                this.setState({ isLoggedIn: false }, () =>
                  localStorage.clear(),
                );
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
  );
}

const styles = {
  container: { marginBottom: 16, width: '100%', textAlign: 'right' },
};
