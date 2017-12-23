import React, { Component } from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import agent from '../../agent';
import { CIRCLE_PAGE_LOADED } from '../../actions';
import { RESET_HEADER } from '../../actions';
import UserList from "../UserList";
import MiniPollList from '../MiniPollList'
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";

const mapStateToProps = state => ({
  polls: state.polls,
  circle: state.circle
})

const mapDispatchToProps = dispatch => ({
  loadCircle: (payload) => dispatch({ type: CIRCLE_PAGE_LOADED, payload }),
  unload: () => dispatch({ type: RESET_HEADER })
})

class Circle extends Component {
  constructor(props) {
    super(props)
    this.switchMenu = this.switchMenu.bind(this)
    this.state = { menu: "fellows" }
  }
  componentWillMount() {
    this.props.loadCircle(agent.Circle.get(this.props.match.params.id))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.circle.name && nextProps.circle !== this.props.circle) {
      nextProps.changeHeader({ title: nextProps.circle.name, back: true })
    }
  }

  switchMenu(e, { name }) {
    this.setState({ menu: name })
  }
  
  render() {
    let { circle } = this.props
    let { menu } = this.state
    if (!circle.name) {
      return (
        <Dimmer active page>
          <Loader content="This Circle is coming..." indeterminate size="huge" />
        </Dimmer>
      )
    }
    return (
      <Container text= { true } textAlign="center" >
        <Image src="/images/bg.jpg" fluid style={{ height: "200px" }} alt="group info" shape="rounded" />
        <Header content={ circle.description } />
        <div style={{ display: "flex", justifyContent: "space-around" }} >
          <div>
            <Icon name="calendar" />
           { (new Date(circle.createdAt)).toDateString() }
          </div>
          <div>
            <Icon name="spy" />
           { circle.creator && circle.creator.username }
          </div>
        </div>
        <Divider />
        <Menu secondary pointing widths={2}>
          <Menu.Item name="fellows" active={ menu === "fellows" } onClick={ this.switchMenu }>
            Fellows 
            <Label circular content={ users.length } />
          </Menu.Item>
          <Menu.Item name="polls" active={ menu === "polls" } onClick={ this.switchMenu }>
            Polls 
            <Label circular content={ polls.length } />
          </Menu.Item>
        </Menu>
        { menu === "fellows" ? 
        <FellowList users={ users } /> : <GroupPollList polls={ polls } /> 
        }
      </Container>
    )
  }
};


const FellowList = props => (
  <Segment style={{ marginBottom: "20px" }}>
    <Header content="Fellows"/>
    <Button content="Add Admin" icon='add' labelPosition='left' color="blue" />
    <Button style={{ marginBottom: "20px" }} content="Add Fellow" icon='add' labelPosition='right' color="blue" />
    <UserList users={ props.users } />
  </Segment> 
)

const GroupPollList = props => (
  <Segment style={{ marginBottom: "20px" }}>
    <Header content="Polls"/>
    <Button style={{ marginBottom: "20px" }} content="Delete Poll" icon='minus' labelPosition='left' color="blue" />
    <Button style={{ marginBottom: "20px" }} as={ Link } to={ `/create/poll` } content="Create Poll" icon='add' labelPosition='right' color="blue" />
    <MiniPollList polls={ props.polls } />
  </Segment>
)
export default connect(mapStateToProps, mapDispatchToProps)(Circle);

const polls = [
  {
    question: "When should we hold tomorrow's class",
    comment: "Let's know so we tell the lecturer",
    canVote: true
  },
  {
    question: "Are you through with the assignment",
    comment: "Let's know so we submit on time",
    canVote: false
  },
  {
    question: "Who is the finest girl in this circle",
    comment: "Some girls have been making mouth since",
    canVote: true
  },
]

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