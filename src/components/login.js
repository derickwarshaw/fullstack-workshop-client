import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

const AUTHORIZE_MUTATION = gql`
  mutation authorize($email: String!) {
    authorize(email: $email)
  }
`;

export default class Login extends Component {
  state = {
    text: '',
  };

  handleTextInput = event => {
    const text = event.target.value;
    this.setState(() => ({ text }));
  };

  render = () => {
    const { user } = this.props;
    return (
      <ApolloConsumer>
        {cache => (
          <Mutation
            mutation={AUTHORIZE_MUTATION}
            onCompleted={data => {
              cache.writeData({
                data: { email: this.state.text, token: data.authorize },
              });
            }}
          >
            {(authorize, { data }) =>
              !user || !user.email ? (
                <div style={styles.container}>
                  <input type="text" onChange={this.handleTextInput} />
                  <button
                    onClick={() =>
                      authorize({ variables: { email: this.state.text } })
                    }
                  >
                    Log In
                  </button>
                </div>
              ) : (
                <div style={styles.container}>
                  <p>{user.email}</p>
                  <button
                    onClick={() =>
                      cache.writeData({
                        data: { email: null, token: null },
                      })
                    }
                  >
                    Log Out
                  </button>
                </div>
              )
            }
          </Mutation>
        )}
      </ApolloConsumer>
    );
  };
}

const styles = {
  container: { marginBottom: 16, width: '100%', textAlign: 'right' },
};
