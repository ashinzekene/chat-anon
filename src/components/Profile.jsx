import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";

class Profile extends Component {
  componentDidMount() {
    this.props.onLoad()
  }
  render() {
    let { user } = this.props
   return (
      <Container>
        <image
          style={{ borderRadius: "50%", width: "200px", height: "200px" }}
          alt="user image"
          src="/images/user.jpg"
        />
        <Header size="huge" style={{ textTransform: "capitalize" }} dividing textAlign="center">{ user.username } </Header>
        Welcome to my profile page
        {/* { JSON.stringify(this.props.user) } */}
      </Container>
    );
  }
}

export default Profile;
