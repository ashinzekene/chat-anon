import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Rating from "semantic-ui-react/dist/commonjs/modules/Rating/Rating";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader/Loader";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

import MiniCircleList from './MiniCircleList'
import UserList from './UserList'
import agent from "../agent";
import { FOLLOWERS_REQUESTED, FOLLOWING_REQUESTED, PROFILE_IMG_URL, PROFILE_PAGE_LOADED, USER_CIRCLES_REQUESTED } from "../actions/index";

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getFollowers: userId => () => dispatch({ type: FOLLOWERS_REQUESTED, payload: agent.User.followers(userId) }),
  getFollowing: userId => () => dispatch({ type: FOLLOWING_REQUESTED, payload: agent.User.following(userId) }),
  getCircles: userId => () => dispatch({ type: USER_CIRCLES_REQUESTED, payload: agent.Circle.user(userId) }),
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
})

class User extends Component {
  constructor(props) {
    super(props)
    this.state = { menu: "followers" }
    this.switchMenu = this.switchMenu.bind(this)
  }
  componentDidMount() {
    console.log(this.props)
    this.props.onLoad(agent.User.get(this.props.match.params.id))
  }

  switchMenu(e, { name }) {
    this.setState({ menu: name })
  }
  
  render() {
    let { user } = this.props
    let { menu } = this.state
   if(!user) {
     return <Loader />
   }
   return (
      <Container>
        <Image
          size="big"
          shape="circular"
          alt="user image"
          src={ user.avatar_url || PROFILE_IMG_URL }
        />
        <Header size="huge" style={{ textTransform: "capitalize", padding: "20px 5px" }} dividing>
          { user.username }
          <Button floated="right" size="large" content="Edit Profile"/>
          <Header.Subheader>
            <Rating icon='star' defaultRating={4} maxRating={4} disabled />
            <div>40 polls voted</div>
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
        { menu === "following" && <UserList onLoad={ this.props.getFollowing(user._id) } users={ user.following } /> }
        { menu === "circles" && <MiniCircleList onLoad={ this.props.getCircles(user._id) } circles={ user.circles } /> }
        { menu === "followers" && <UserList onLoad={ this.props.getFollowers(user._id) } users={ user.followers } /> }
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)