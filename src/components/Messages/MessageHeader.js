import React from "react";
import { Segment, Icon, Input, Header } from "semantic-ui-react";

class MessageHeader extends React.Component {
  render() {
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" floated="left" style={{ marginBotton: 0 }}>
          <span>
            Channel
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
        </Header>
        {/* Channel Search Input */}
        <Header fluid="true" floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          ></Input>
        </Header>
      </Segment>
    );
  }
}

export default MessageHeader;
