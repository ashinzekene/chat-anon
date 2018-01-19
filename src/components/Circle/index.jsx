import React, { Component } from "react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Label from "semantic-ui-react/dist/commonjs/elements/Label/Label";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader/Loader";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import { connect } from 'react-redux';

import agent from '../../agent';
import { CIRCLE_PAGE_LOADED, CIRCLE_FELLOWS_REQUEST, CIRCLE_POLLS_REQUEST, CIRCLE_FELLOW_REMOVED, BASENAME } from '../../actions';
import { RESET_HEADER } from '../../actions';
import CirclePollList from "./CirclePollList";
import FellowList from './FellowList'


const mapStateToProps = state => ({
  polls: state.polls,
  circle: state.circle,
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  loadCircle: payload => dispatch({ type: CIRCLE_PAGE_LOADED, payload }),
  unload: () => dispatch({ type: RESET_HEADER }),
  getPolls: payload => dispatch({ type: CIRCLE_POLLS_REQUEST, payload }),
  removeFellow: (userId, circleId) => dispatch({ type: CIRCLE_FELLOW_REMOVED, payload: agent.Circle.removeFellow(userId, circleId) }),
  getFellows: payload => dispatch({ type: CIRCLE_FELLOWS_REQUEST, payload })
})

class Circle extends Component {
  constructor(props) {
    super(props)
    this.state = { menu: "fellows" }
    this.switchMenu = this.switchMenu.bind(this)
    this.getFellows = this.getFellows.bind(this)
    this.getPolls = this.getPolls.bind(this)
    this.removeFellow = this.removeFellow.bind(this)
  }

  componentWillMount() {
    this.props.loadCircle(agent.Circle.get(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.circle.name && nextProps.circle !== this.props.circle) {
      nextProps.changeHeader({ title: nextProps.circle.name, back: true })
    }
  }
  removeFellow(userId) {
    let { removeFellow, circle } = this.props
    removeFellow(userId, circle._id)
  }
  getFellows() {
    this.props.getFellows(agent.Circle.fellows(this.props.circle.handle))
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
      <Container className="main-circle" text={true} textAlign="center" >
        <Image src={BASENAME +"/images/bg.jpg" } fluid style={{ height: "200px" }} alt="group info" shape="rounded" />
        <Header content={circle.description} />
        <div style={{ display: "flex", justifyContent: "space-around" }} >
          <div>
            <Icon name="calendar" />
            {(new Date(circle.createdAt)).toDateString()}
          </div>
          <div>
            <Icon name="spy" />
            {circle.creator && circle.creator.username}
          </div>
        </div>
        <Divider />
        <Menu secondary pointing widths={2}>
          <Menu.Item name="fellows" active={menu === "fellows"} onClick={this.switchMenu}>
            Fellows
            {this.props.circle.fellows && <Label circular content={this.props.circle.fellows.length} />}
          </Menu.Item>
          <Menu.Item name="polls" active={menu === "polls"} onClick={this.switchMenu}>
            Polls
            {this.props.circle.polls && <Label circular content={this.props.circle.polls.length} />}
          </Menu.Item>
        </Menu>
        {menu === "fellows" ?
          <FellowList removeFellow={ this.removeFellow } circle={ this.props.circle } onLoad={this.getFellows} />
          :
          <CirclePollList onLoad={this.getPolls} polls={this.props.circle.polls} />
        }
      </Container>
    )
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Circle);
