import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";

class Profile extends Component {
  componentDidMount() {
    this.props.onLoad()
  }
  render() {
    let { user } = this.props
   return (
      <Container>
        <Image 
          centered
          size="huge"
          alt="user image"
          shape="circular"
          src="/images/user.jpg"
        />
        <Header size="huge" style={{ textTransform: "capitalize" }} dividing textAlign="center">{ user.username } </Header>
        Welcome to my profile page
        { JSON.stringify(this.props.user) }
      </Container>
    );
  }
}

export default Profile;
