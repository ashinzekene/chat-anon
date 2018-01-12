import React from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Icon, Menu, Button } from "semantic-ui-react";

const MySidebar = props => (
  <Sidebar className="my-sidebar" as={Menu} animation='uncover' direction='left' width='wide' borderless visible={ props.visible } icon='labeled' vertical >
    <Menu.Item style={ menuItemStyle } as={ NavLink } to="/" exact name='home'>
      <Icon name='home' />
      Home
    </Menu.Item>
    <Menu.Item style={ menuItemStyle } as={ NavLink } to="/polls" name='polls'>
      <Icon name='inbox' />
      Polls
    </Menu.Item>
    <Menu.Item style={ menuItemStyle } as={ NavLink } to="/circles" name='circles'>
      <Icon name='users' />
      Cirlces
    </Menu.Item>
    <Menu.Item style={ menuItemStyle } as={ NavLink } to={ props.currentUser.username ? `@${props.currentUser.username}` : "login" } name='profile'>
      <Icon name='user' />
      Profile
    </Menu.Item>
    <Menu.Item style={ menuItemStyle } as={ NavLink } to="/explore" name='profile'>
      <Icon name='announcement' />
      Explore
    </Menu.Item>
    {
      props.currentUser && props.currentUser.hasOwnProperty("username") ?
      <Menu.Item style={ menuItemStyle } as={ NavLink } to="/signup">
        <Button onClick={ props.onLogout } icon="log out" content="Log Out" />
      </Menu.Item>
      :
      <Menu.Item style={ menuItemStyle } as={ NavLink } to="/signup">
        <Button icon="signup" content="Sign Up/In" />
      </Menu.Item>
    }
  </Sidebar>
)

const menuItemStyle = {
  borderRadius: "50%",
  width: "100%"
}

export default MySidebar