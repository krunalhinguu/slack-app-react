import React from "react";
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
} from "semantic-ui-react";
import { SliderPicker } from "react-color";

class ColorPanel extends React.Component {
  state = {
    modal: false,
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { modal } = this.state;

    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button
          icon="add"
          size="small"
          color="blue"
          onClick={this.openModal}
        ></Button>
        {/* Color picker modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App color</Modal.Header>
          <Modal.Content>
            <Label content="Primary Color" style={{ marginBottom: "10px" }} />
            <SliderPicker />
            <Label
              content="Secondary Color"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            />
            <SliderPicker />
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted>
              <Icon name="checkmark" /> Save colors
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default ColorPanel;
