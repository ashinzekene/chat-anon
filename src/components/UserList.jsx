import React, { Component } from "react";
import Item from "semantic-ui-react/dist/commonjs/views/Item/Item";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";


class UserList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // const { users } = this.props
    return (
      <div style={{ textAlign: "left" }}>
        <Item.Group divided unstackable>
          { users.map( (user, i) => (
          <Item key={`item${i}`}>
            <img alt={ user.username } height="50px" width="50px" style={{ marginRight: "20px", verticalAlign: "middle", borderRadius: "50%" }} src={ user.image } />
            <Item.Content>
              <Item.Meta key={`header${i}`} as='a'>{ `${user.first_name} ${user.last_name}` }
                <Button floated="right" circular icon={ user.isFollowing ? "add" : "minus"} />
              </Item.Meta>
              <Item.Description key={`meta${i}`} >{ `@${user.username}` }</Item.Description>
            </Item.Content>
          </Item>
          )) }
        </Item.Group>
      </div>
    )
  }
}

export default UserList

const users = [
  {
    image: "/images/user.jpg",
    username: "chinonso",
    first_name: "Nonso",
    last_name: "Ashinze",
    isFollowing: true
  },
  {
    image: "/images/user.jpg",
    username: "ekonash",
    first_name: "Ekene",
    last_name: "Ashinze",
    isFollowing: true
  },
  {
    image: "/images/user.jpg",
    username: "ekonash",
    first_name: "Ekene",
    last_name: "Ashinze",
    isFollowing: false
  },
  {
    image: "/images/user.jpg",
    username: "storme",
    first_name: "Terry",
    last_name: "Storm",
    isFollowing: true
  },
  {
    image: "/images/user.jpg",
    username: "flash",
    first_name: "Agrand",
    last_name: "Verge",
    isFollowing: false
  },
]