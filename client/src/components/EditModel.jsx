import React, { Component } from "react";
import {
  Button,
  Image,
  Modal,
  Form,
  TextArea
} from "semantic-ui-react";

class EditItem extends Component {
  constructor(props){
    super(props);
    this.state={
        name:"",
        ingredients:"",
        method:"",
        id:""
    }
  }
  componentWillReceiveProps(next){
    this.setState({
      name:next.name,
      ingredients:next.ingredients,
      method:next.method,
      id:next.id
    })
  }
    
  closeEdit = () => this.props.closeEdit();

  handleEditItem(){
    if(this.state.name !== "" && this.state.ingredients !== "" && this.state.method !== ""){
        this.props.handleEditItem(this.state);
    }
  }

  render() {
    return (
      <div>
        <Modal open={this.props.open} onClose={this.close}>
          <Modal.Header>Edit Recipe</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={this.props.poto} />
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Name"
                    placeholder="Name"
                    type="text"
                    value={this.state.name}
                    onChange={(e)=>this.setState({name:e.target.value})}
                    required
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="Ingredients"
                    placeholder="Provide the Ingredients"
                    value={this.state.ingredients}
                    onChange={(e)=>this.setState({ingredients:e.target.value})}
                    required
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="Method"
                    placeholder="Provide the cooking method"
                    value={this.state.method}
                    onChange={(e)=>this.setState({method:e.target.value})}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.handleEditItem.bind(this)}>
              Update
            </Button>
            <Button primary onClick={this.closeEdit}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default EditItem;
