import React, { Component } from "react";
import FoodItem from "./components/card.jsx";
import Login from "./components/LoginModel.jsx";
import SignUp from "./components/SignModel.jsx";
import AddItem from "./components/AddModel.jsx";
import EditItem from "./components/EditModel.jsx";
import DeleteItem from './components/DeleteModel.jsx';
import { Button, Message, Container, Menu, Header } from "semantic-ui-react";
import poto from "./assets/images/foodImage.jpg";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false,
      openSignUp: false,
      openAdd: false,
      openEdit: false,
      openDelete: false,
      mesageOpen: false,
      isLogged: false,
      userName: "Yogesh",
      foodData: [],
      selectedId:null
    };
  }

  componentDidMount() {
    const url = "/item/";

    axios
      .get(url)
      .then(res => {
        console.log("ITEM RES DID", res.data);
        this.setState({
          foodData: res.data.Items
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  }

  totalCaller(){
    const url = "/item/";
    axios
      .get(url)
      .then(res => {
        console.log("ITEM RES DID", res.data);
        this.setState({
          foodData: res.data.Items
        });
      })
      .catch(err => {
        console.log("Err", err);
      });
  }
  handleLogin = () => {
    this.setState({
      openLogin: true
    });
  };
  handleSignUp = () => {
    this.setState({
      openSignUp: true
    });
  };
  closeSignUp = () => {
    this.setState({
      openSignUp: false
    });
  };
  close = () => {
    this.setState({
      openLogin: false
    });
  };
  handleSubmit = data => {
    const url = "/user/login";

    axios
      .post(url, data)
      .then(res => {
        console.log("RESPONSE OF LOGIN", res);
        this.setState({
          openLogin: false,
          mesageOpen: true,
          message: res.data.message,
          isLogged: true,
          userName: res.data.username
        });
        setTimeout(function() {
          self.setState({
            mesageOpen: false
          });
        }, 5000);
      })
      .catch(err => {
        console.log("Error of login", err);
      });
    const self = this;
  };
  handleSignUpSubmit = data => {
    const self = this;
    const url = "/user/signup";
    delete data.confirmPassword;

    axios
      .post(url, data)
      .then(res => {
        this.setState({
          openSignUp: false,
          mesageOpen: true,
          message: res.data.message
        });
        setTimeout(function() {
          self.setState({
            mesageOpen: false
          });
        }, 5000);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleCancel = () => {
    this.setState({
      openLogin: false,
      openSignUp: false
    });
  };
  handleSignOut = () => {
    this.setState({
      isLogged: false
    });
  };
  handleAdd = () => {
    this.setState({
      openAdd: true
    });
  };
  closeAdd = () => {
    this.setState({
      openAdd: false
    });
  };
  handleAddItem = data => {
    const url = "/item/";
    const self = this;

    axios.post(url,data)
    .then((res)=>{
      this.setState({
        openAdd: false,
        mesageOpen: true,
        message: res.data.message
      });
      this.totalCaller();
      setTimeout(function() {
        self.setState({
          mesageOpen: false
        });
      }, 5000);
    })
    .catch((err)=>console.log(err))
  };
  handleEdit = (data) => {
    let selobject = this.state.foodData.filter((a) => {
      if(data === a._id) return a;
    })
    this.setState({
      selectedId:data,
      name:selobject[0].name,
      ingredients:selobject[0].ingredients,
      method:selobject[0].method,
      openEdit: true
    });
  };
  closeEdit = () => {
    this.setState({
      openEdit: false
    });
  };
  closeDelete=()=>{
    this.setState({
      openDelete:false
    })
  }
  handleEditItem = data => {
    const url = `/item/${data.id}`;
    const self = this;
    let body = [];
    delete data.id;
    let entry = Object.entries(data);
    for(let i=0;i < entry.length;i++){
      let obj = {"propName":entry[i][0],"value":entry[i][1]};
      body.push(obj)
    }

    axios.patch(url,body)
    .then((res)=>{
      this.setState({
        openEdit: false,
        mesageOpen: true,
        message: res.data.message
      });
      this.totalCaller();
      setTimeout(function() {
        self.setState({
          mesageOpen: false
        });
      }, 5000);
    })
    .catch((err)=>console.log(err))

  };
  handleDelete = (data) => {
    this.setState({
      selectedId:data,
      openDelete: true
    });
  };
  handleDeleteItem=()=>{
    const url = `/item/${this.state.selectedId}`;
    const self = this;

    axios.delete(url)
    .then((res)=>{
      this.setState({
        openDelete: false,
        mesageOpen: true,
        message: res.data.message
      });
      this.totalCaller();
      setTimeout(function() {
        self.setState({
          mesageOpen: false
        });
      }, 5000);
    })
    .catch((err)=>console.log(err))
  }
  render() {
    return (
      /*first div*/
      <div>
        <Container>
          {this.state.mesageOpen && (
            <Message positive className="message">
              <Message.Header>{this.state.message}</Message.Header>
            </Message>
          )}

          <Login
            open={this.state.openLogin}
            close={this.close}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
          />
          <SignUp
            open={this.state.openSignUp}
            closeSignUp={this.closeSignUp}
            handleSignUpSubmit={this.handleSignUpSubmit}
            handleCancel={this.handleCancel}
          />
          <AddItem
            open={this.state.openAdd}
            poto={poto}
            closeAdd={this.closeAdd}
            handleAddItem={this.handleAddItem}
          />
          <EditItem
            open={this.state.openEdit}
            poto={poto}
            id={this.state.selectedId}
            name={this.state.name}
            ingredients={this.state.ingredients}
            method={this.state.method}
            closeEdit={this.closeEdit}
            handleEditItem={this.handleEditItem}
          />
          <DeleteItem 
          open={this.state.openDelete}
          closeDelete={this.closeDelete}
          handleDeleteItem={this.handleDeleteItem}
          />

          <Menu borderless size="huge">
            <Menu.Menu position="right">
              <Menu.Item>
                <Header size="huge">Food World</Header>
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item>
                {this.state.isLogged === false ? (
                  <Button primary onClick={this.handleLogin}>
                    Login
                  </Button>
                ) : (
                  <p>Hi,{this.state.userName}</p>
                )}
              </Menu.Item>
              <Menu.Item>
                {this.state.isLogged === false ? (
                  <Button primary onClick={this.handleSignUp}>
                    Sign Up
                  </Button>
                ) : (
                  <Button primary onClick={this.handleSignOut}>
                    Sign Out
                  </Button>
                )}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          {this.state.isLogged === true && (
            <Button fluid onClick={this.handleAdd}>
              Add New Recipe
            </Button>
          )}
          {this.state.foodData.map(e => {
            return (
              <FoodItem
                key={e._id}
                name={e.name}
                id={e._id}
                ingredients={e.ingredients}
                method={e.method}
                isLoggedIn={this.state.isLogged}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            );
          })}
        </Container>
      </div> //last div
    );
  }
}

export default App;
