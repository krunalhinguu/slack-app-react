import React from "react";
import { Segment, Icon, Input, Header } from "semantic-ui-react";

class MessageHeader extends React.Component {
  render() {
    const {
      channelName,
      numUsers,
      handleSearchChange,
      searchLoading,
      isPrivateChannel,
    } = this.props;

    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" floated="left" style={{ marginBotton: 0 }}>
          <span>
            {channelName}
            {!isPrivateChannel && (
              <Icon
                name={"star outline"}
                color="black"
                style={{ marginLeft: "2px" }}
              />
            )}
          </span>
          <Header.Subheader>{numUsers}</Header.Subheader>
        </Header>
        {/* Channel Search Input */}
        <Header fluid="true" floated="right">
          <Input
            loading={searchLoading}
            size="mini"
            icon="search"
            name="searchTerm"
            onChange={handleSearchChange}
            placeholder="Search Messages"
          ></Input>
        </Header>
      </Segment>
    );
  }
}

export default MessageHeader;
