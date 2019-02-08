import React, { Component } from "react";
import {
  Button,
  Image,
  Modal,
  Form,
  TextArea
} from "semantic-ui-react";

class AddItem extends Component {
    localData = {
        name:"",
        ingredients:"",
        method:""
    }
  closeAdd = () => this.props.closeAdd();

  handleAddItem(){
    if(this.localData.name !== "" && this.localData.ingredients !== "" && this.localData.method !== ""){
        this.props.handleAddItem(this.localData);
    }
  }

  render() {
    return (
      <div>
        <Modal open={this.props.open} onClose={this.close}>
          <Modal.Header>Add New Recipie</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={this.props.poto} />
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Name"
                    placeholder="Name"
                    type="text"
                    onChange={(e)=>this.localData.name = e.target.value}
                    required
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="Ingredients"
                    placeholder="Provide the Ingredients"
                    onChange={(e)=>this.localData.ingredients = e.target.value}
                    required
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="Method"
                    placeholder="Provide the cooking method"
                    onChange={(e)=>this.localData.method = e.target.value}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.handleAddItem.bind(this)}>
              Add
            </Button>
            <Button primary onClick={this.closeAdd}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AddItem;
