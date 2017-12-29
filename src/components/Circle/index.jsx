import React, { Component } from "react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader/Loader";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import agent from '../../agent';
import { CIRCLE_PAGE_LOADED, CIRCLE_FELLOWS_REQUEST, CIRCLE_POLLS_REQUEST } from '../../actions';
import { RESET_HEADER } from '../../actions';
import UserList from "../UserList";
import MiniPollList from '../MiniPollList'

const mapStateToProps = state => ({
  polls: state.polls,
  circle: state.circle
})

const mapDispatchToProps = dispatch => ({
  loadCircle: payload => dispatch({ type: CIRCLE_PAGE_LOADED, payload }),
  unload: () => dispatch({ type: RESET_HEADER }),
  getPolls: payload => dispatch({ type: CIRCLE_POLLS_REQUEST, payload }),
  getFellows: payload => dispatch({ type: CIRCLE_FELLOWS_REQUEST, payload })
})

class Circle extends Component {
  constructor(props) {
    super(props)
    this.state = { menu: "fellows" }
    this.switchMenu = this.switchMenu.bind(this)
    this.getFellows = this.getFellows.bind(this)
    this.getPolls = this.getPolls.bind(this)
  }
  componentWillMount() {
    this.props.loadCircle(agent.Circle.get(this.props.match.params.id))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.circle.name && nextProps.circle !== this.props.circle) {
      nextProps.changeHeader({ title: nextProps.circle.name, back: true })
    }
  }
  getFellows() {
    this.props.getFellows(agent.Circle.fellows(this.props.circle._id))
  }
  getPolls() {
    this.props.getPolls(agent.Poll.circle(this.props.circle._id))
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
      <Container className="main-circle" text= { true } textAlign="center" >
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
            { this.props.circle.fellows && <Label circular content={ this.props.circle.fellows.length } /> }
          </Menu.Item>
          <Menu.Item name="polls" active={ menu === "polls" } onClick={ this.switchMenu }>
            Polls 
            { this.props.circle.polls && <Label circular content={ this.props.circle.polls.length } /> }
          </Menu.Item>
        </Menu>
        { menu === "fellows" ? 
        <FellowList onLoad={ this.getFellows } fellows={ this.props.circle.fellows } /> 
        :
        <GroupPollList onLoad={ this.getPolls } polls={ this.props.circle.polls } /> 
        }
      </Container>
    )
  }
};


const FellowList = props => (
  <Segment style={{ marginBottom: "20px" }}>
    <Header content="Fellows"/>
    <Button content="Add Admin" icon='add' labelPosition='left' />
    <Button style={{ marginBottom: "20px" }} content="Add Fellow" icon='add' labelPosition='right' />
    <UserList onLoad={ props.onLoad } users={ props.fellows } />
  </Segment> 
)

const GroupPollList = props => (
  <Segment style={{ marginBottom: "20px" }}>
    <Header content="Polls"/>
    <Button style={{ marginBottom: "20px" }} content="Delete Poll" icon='minus' labelPosition='left' />
    <Button style={{ marginBottom: "20px" }} as={ Link } to={ `/create/poll` } content="Create Poll" icon='add' labelPosition='right' />
    <MiniPollList onLoad={ props.onLoad } polls={ props.polls } />
  </Segment>
)
export default connect(mapStateToProps, mapDispatchToProps)(Circle);
