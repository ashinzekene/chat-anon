import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Rating from "semantic-ui-react/dist/commonjs/modules/Rating/Rating";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { menu: "followers" }
  }
  componentDidMount() {
    this.props.onLoad()
  }

  switchMenu = (e, { name }) => {
    this.setState({ menu: name })
  }
  
  render() {
    let { user } = this.props
    let { menu } = this.state
   return (
      <Container>
        <Image
          size="big"
          shape="circular"
          alt="user image"
          src="/images/user.jpg"
        />
        <Header size="huge" style={{ textTransform: "capitalize" }} dividing>
          { user.username }
          <Header.Subheader>
            40 polls voted
            <Rating icon='star' defaultRating={4} maxRating={4} disabled />
          </Header.Subheader>
        </Header>
        <Menu secondary pointing widths={3}>
          <Menu.Item name="followers" active={ menu === "followers" } onClick={ this.switchMenu }>
          <Icon name="user" />
            Followers
            <Label circular content={ "42" } />
          </Menu.Item>
          <Menu.Item name="circles" active={ menu === "circles" } onClick={ this.switchMenu }>
          <Icon name="users" />
            Circles
            <Label circular content={ "2" } />
          </Menu.Item>
          <Menu.Item name="following" active={ menu === "following" } onClick={ this.switchMenu }>
          <Icon name="user" />
            Following
            <Label circular content={ "30" } />
          </Menu.Item>
        </Menu>
      </Container>
    );
  }
}

export default Profile;
