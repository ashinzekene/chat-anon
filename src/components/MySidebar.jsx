import React from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Icon, Menu, Button } from "semantic-ui-react";

const MySidebar = props => (
  <Sidebar style={ style } as={Menu} animation='slide along' direction='left' width='thin' borderless visible={ props.visible } icon='labeled' vertical inverted>
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
    <Menu.Item style={ menuItemStyle } as={ NavLink } to="/profile" name='profile'>
      <Icon name='user' />
      Profile
    </Menu.Item>
    <Menu.Item style={ menuItemStyle } as={ NavLink } to="/signup">
      <Button icon="sign in" content="Sign Up" />
    </Menu.Item>
  </Sidebar>
)

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
const menuItemStyle = {
  borderRadius: "50%"
}

export default MySidebar