import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

class Login extends Component {
  localData = {
    email: "",
    password: ""
  };
  close = () => this.props.close();
  handleSubmit() {
    if (this.localData.email === "" && this.localData.password === "") {
      alert("Please enter All values");
    } else {
      this.props.handleSubmit(this.localData);
    }
  }
  render() {
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={true}
          closeOnDimmerClick={false}
          onClose={this.close}
        >
          <Modal.Header>Login</Modal.Header>

          <Modal.Content>
            <Form>
              <Form.Group unstackable widths={1}>
                <Form.Input
                  label="Email"
                  placeholder="Email"
                  type="email"
                  onChange={(e)=> this.localData.email = e.target.value}
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
              <Button type="submit" onClick={this.handleSubmit.bind(this)}>
                Login
              </Button>
              <Button type="cancel" onClick={this.props.handleCancel.bind(this)}>
                Cancel
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default Login;
