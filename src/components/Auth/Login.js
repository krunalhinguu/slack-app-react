import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    isLoading: false,
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handelSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], isLoading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signInUser) => {
          console.log(signInUser);
          this.setState({ isLoading: false });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            isLoading: false,
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };
  render() {
    const { email, password, errors, isLoading } = this.state;
    return (
      <Grid className="app" textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="violet" textAlign="center">
            <Icon name="code branch" color="violet"></Icon>
            Login to DevChat
          </Header>
          <Form onSubmit={this.handelSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
                value={email}
                className={this.handleInputError(errors, "email")}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, "password")}
              />

              {/*  <Button color="orange" fluid size="large">
                Submit
              </Button>  */}
              <Button
                disabled={isLoading}
                className={isLoading ? "loading" : ""}
                animated="fade"
                color="violet"
                fluid
                size="large"
              >
                <Button.Content visible>Login</Button.Content>
                <Button.Content hidden>Submit</Button.Content>
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>{this.displayErrors(errors)}</Message>
          )}
          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
