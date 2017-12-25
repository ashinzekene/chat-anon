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

import MiniCircleList from '../MiniCircleList'
import UserList from '../UserList'
import agent from "../../agent";
import { FOLLOWERS_REQUESTED, FOLLOWING_REQUESTED, CIRCLES_REQUESTED, MY_PROFILE_LOADED } from "../../actions/index";

const mapStateToProps = state => ({
  user: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  getFollowers: () => dispatch({ type: FOLLOWERS_REQUESTED, payload: agent.User.followers() }),
  getFollowing: () => dispatch({ type: FOLLOWING_REQUESTED, payload: agent.User.following() }),
  getCircles: () => dispatch({ type: CIRCLES_REQUESTED, payload: agent.Circle.getAll() }),
  onLoad: () => dispatch({ type: MY_PROFILE_LOADED, payload: agent.User.getMe() }),
})

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { menu: "followers" }
    this.switchMenu = this.switchMenu.bind(this)
  }
  componentDidMount() {
    this.props.onLoad()
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
          src="/images/user.jpg"
        />
        <Header size="huge" style={{ textTransform: "capitalize", padding: "20px 5px" }} dividing>
          { user.username }
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
        { menu === "following" && <UserList onLoad={ this.props.getFollowing } users={ this.props.user.following } /> }
        { menu === "circles" && <MiniCircleList onLoad={ this.props.getCircles } circles={ this.props.user.circles } /> }
        { menu === "followers" && <UserList onLoad={ this.props.getFollowers } users={ this.props.user.followers } /> }
      </Container>
    );
  }
}


const circles = [
  {
    name: "The People of Calibre",
    description: "Let's know so we tell the lecturer",
    canVote: true
  },
  {
    name: "The Geneticists",
    description: "Let's know so we submit on time",
    canVote: false
  },
  {
    name: "Classy Babes",
    description: "The girls that have mouth",
    canVote: true
  },
]

const followers = [
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)