import React from "react";
import firebase from "../../firebase";
import uuidv4 from "uuid/v4";
import { Segment, Input, Button } from "semantic-ui-react";

import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";

class MessageForm extends React.Component {
  state = {
    message: "",
    isLoading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: [],
    modal: false,
    uploadState: "",
    uploadTask: null,
    storageRef: firebase.storage().ref(),
    percentageUploaded: 0,
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  createMessage = (fileURL = null) => {
    const { message, user } = this.state;
    const msg = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    if (fileURL !== null) {
      msg["image"] = fileURL;
    } else {
      msg["content"] = this.state.message;
    }

    return msg;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendMessage = () => {
    const { getMessagesRef } = this.props;
    const { message, channel } = this.state;

    if (message) {
      this.setState({ isLoading: true });
      getMessagesRef()
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ isLoading: false, message: "", errors: [] });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            isLoading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        isLoading: false,
        errors: this.state.errors.concat({ message: "Add a message" }),
      });
    }
  };

  getPath = () => {
    if (this.props.isPrivateChannel) {
      return `chat/private-${this.state.channel.id}`;
    } else {
      return "chat/public";
    }
  };

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.getMessagesRef();
    const filePath = `${this.getPath()}/public/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "Uploading...",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata),
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          (snap) => {
            const percentageUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentageUploaded });
          },
          (err) => {
            console.error(err.message);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null,
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => {
                this.sendFileMessage(downloadURL, ref, pathToUpload);
              })
              .catch((err) => {
                console.error(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null,
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileURL, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileURL))
      .then(() => {
        this.setState({
          uploadState: "Done",
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
        });
      });
  };

  render() {
    const {
      errors,
      message,
      isLoading,
      modal,
      percentageUploaded,
      uploadState,
    } = this.state;

    return (
      <Segment className="message__from">
        <Input
          fluid
          name="message"
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"}></Button>}
          labelPosition="left"
          placeholder="Write your Message"
          onChange={this.handleChange}
          className={
            errors.some((error) => error.message.includes("message"))
              ? "error"
              : ""
          }
        ></Input>
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            disabled={isLoading}
          ></Button>
          <Button
            color="teal"
            disabled={uploadState === "Uploading..."}
            onClick={this.openModal}
            content="Upload Media"
            labelPosition="Right"
            icon="cloud upload"
          ></Button>
        </Button.Group>
        <FileModal
          uploadFile={this.uploadFile}
          modal={modal}
          closeModal={this.closeModal}
        />
        <ProgressBar
          uploadState={uploadState}
          percentageUploaded={percentageUploaded}
        />
      </Segment>
    );
  }
}

export default MessageForm;
