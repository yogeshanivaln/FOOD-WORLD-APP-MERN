import React, { Component } from "react";
import { Button,Item } from "semantic-ui-react";
import poto from "../assets/images/foodImage.jpg";


class FoodItem extends Component{
  render(){
    const props = this.props;
    return(
      <Item.Group divided>
    <Item>
      <Item.Image src={poto} />
      <Item.Content>
        <Item.Header as="a">{props.name}</Item.Header>
        <Item.Meta>
          <span className="cinema">South indian Special</span>
        </Item.Meta>
        <Item.Description>
          <b>Ingrdients:</b>{props.ingredients}
        </Item.Description>
        <Item.Description>
          <b>Description:</b>{props.method}
        </Item.Description>
        {props.isLoggedIn === true ? (<Item.Extra>
          <Button primary floated="right" onClick={this.props.handleEdit.bind(this,props.id)}>
            Edit
          </Button>
          <Button primary floated="right" onClick={this.props.handleDelete.bind(this,props.id)}>
            Delete
          </Button>
        </Item.Extra>):(<Item.Extra>
          <Button primary floated="right" disabled>
            Edit
          </Button>
          <Button primary floated="right" disabled>
            Delete
          </Button>
        </Item.Extra>)}
      </Item.Content>
    </Item>
  </Item.Group>
    )
  }
}
export default FoodItem;
