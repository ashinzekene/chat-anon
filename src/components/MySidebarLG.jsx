import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Button, GridColumn, Input } from "semantic-ui-react";

let activeItem = 'updates'
const MySidebarLG = props => (
  <GridColumn className="my-sidebar" tablet="6" laptop="5" widescreen="5" largeScreen="4">
    <Menu size="huge" pointing vertical style={{height: "99vh" }}>
      <Menu.Item as={NavLink} to="/" exact name='home'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as={NavLink} to="/polls" name='polls'>
        <Icon name='inbox' />
        Polls
      </Menu.Item>
      <Menu.Item as={NavLink} to="/circles" name='circles'>
        <Icon name='users' />
        Cirlces
      </Menu.Item>
      <Menu.Item as={NavLink} to={props.currentUser.username ? `@${props.currentUser.username}` : "login"} name='profile'>
        <Icon name='user' />
        Profile
      </Menu.Item>
      <Menu.Item as={NavLink} to="/explore" name='profile'>
        <Icon name='announcement' />
        Explore
      </Menu.Item>
      <Menu.Item>
        <Input icon='search' placeholder='Search mail...' />
      </Menu.Item>
    {
      props.currentUser && props.currentUser.hasOwnProperty("username") ?
      <Menu.Item as={NavLink} to="/signup">
          <Button onClick={props.onLogout} icon="log out" content="Log Out" />
        </Menu.Item>
        :
        <Menu.Item as={NavLink} to="/signup">
          <Button icon="signup" content="Sign Up/In" />
        </Menu.Item>
    }
    </Menu>
  </GridColumn>
)


const menuItemStyle = {
  borderRadius: "50%",
  width: "100%"
}

export default MySidebarLG