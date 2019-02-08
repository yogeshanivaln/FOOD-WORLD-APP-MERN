import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

class SignUp extends Component {
  localData = {
    name:"",
    email: "",
    password: "",
    confirmPassword: ""
  };
  closeSignUp = () => this.props.closeSignUp();

  handleSignUpSubmit() {
    if (
      this.localData.email === "" &&
      this.localData.password === "" &&
      this.localData.confirmPassword === "" &&
      this.localData.name === ""
    ) {
      if (this.localData.password === this.localData.confirmPassword) {
        alert("Please enter the value");
      }
    } else {
      this.props.handleSignUpSubmit(this.localData);
    }
  }

  render() {
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.closeSignUp}
        >
          <Modal.Header>Sign Up</Modal.Header>

          <Modal.Content>
            <Form>
            <Form.Group widths={1}>
                <Form.Input
                  label="Name"
                  placeholder="Name"
                  type="text"
                  onChange={(e)=>this.localData.name = e.target.value}
                  required
                />
              </Form.Group>
              <Form.Group widths={1}>
                <Form.Input
                  label="Email"
                  placeholder="Email"
                  type="email"
                  onChange={(e)=>this.localData.email = e.target.value}
                  required
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input
                  label="Password"
                  placeholder="Password"
                  type="password"
                  onChange={(e)=> this.localData.password = e.target.value}
                  required
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e)=> this.localData.confirmPassword = e.target.value}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                onClick={this.handleSignUpSubmit.bind(this)}
              >
                Sign Up
              </Button>
              <Button
                type="cancel"
                onClick={this.props.handleCancel.bind(this)}
              >
                Cancel
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SignUp;
