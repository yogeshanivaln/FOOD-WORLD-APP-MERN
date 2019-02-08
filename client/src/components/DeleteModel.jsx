import React, { Component } from "react";
import {
  Button,
  Image,
  Modal,
  Form,
  TextArea
} from "semantic-ui-react";

class DeleteItem extends Component {
    
  closeDelete = () => this.props.closeDelete();

  render() {
    return (
      <div>
        <Modal open={this.props.open} onClose={this.close}>
          <Modal.Header>Confirm</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Are you sure to Delete the Recipie
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.props.handleDeleteItem.bind(this)}>
              Delete
            </Button>
            <Button primary onClick={this.closeDelete}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteItem;
