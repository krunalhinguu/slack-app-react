import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import firebase from "../../firebase";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
  };
  /* 
  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.currentUser });
  }
 */
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed is as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out </span>,
    },
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Sign Out!!"));
  };
  render() {
    const { user } = this.state;
    /*  console.log(this.props.currentUser); */
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Row style={{ padding: "1.5em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code"></Icon>
            <Header.Content>DevChat</Header.Content>
          </Header>
          {/* User Dropdown */}
          <Header style={{ margin: 0 }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image ssrc={user.photoURL} spaced="right" avatar />
                  {user.displayName}
                </span>
              }
              options={this.dropdownOptions()}
            ></Dropdown>
          </Header>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(UserPanel);
