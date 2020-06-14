import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    isLoading: false,
    userRef: firebase.database().ref("users"),
  };
  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "Fill in all the fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPassWordValid(this.state)) {
      error = { message: "password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      // form valid
      return true;
    }
  };
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  isPassWordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };
  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handelSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], isLoading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user created");
              });
              this.setState({ isLoading: false });
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                isLoading: false,
              });
            });
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
  saveUser = (createdUser) => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };
  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      isLoading,
    } = this.state;
    return (
      <Grid className="app" textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"></Icon>
            Register for DevChat
          </Header>
          <Form onSubmit={this.handelSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                value={username}
              />
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
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
              />

              {/*  <Button color="orange" fluid size="large">
                Submit
              </Button>  */}
              <Button
                disabled={isLoading}
                className={isLoading ? "loading" : ""}
                animated="fade"
                color="orange"
                fluid
                size="large"
              >
                <Button.Content visible>Register</Button.Content>
                <Button.Content hidden>Submit</Button.Content>
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>{this.displayErrors(errors)}</Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
