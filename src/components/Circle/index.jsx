import React, { Component } from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { connect } from 'react-redux';
import agent from '../../agent';
import { CIRCLE_PAGE_LOADED } from '../../actions';
import { RESET_HEADER } from '../../actions';
import { Link } from "react-router-dom";
import UserList from "../UserList";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import Tab from "semantic-ui-react/dist/commonjs/modules/Tab/Tab";

const mapStateToProps = state => ({
  circle: state.circle
})

const mapDispatchToProps = dispatch => ({
  loadCircle: (payload) => dispatch({ type: CIRCLE_PAGE_LOADED, payload }),
  unload: () => dispatch({ type: RESET_HEADER })
})

class Circle extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.loadCircle(agent.Circle.get(this.props.match.params.id))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.circle.name && nextProps.circle !== this.props.circle) {
      nextProps.changeHeader({ title: nextProps.circle.name, back: true })
    }
  }
  render() {
    if (!this.props.circle.name) {
      return (
        <Dimmer active page>
          <Loader content="This Circle is coming..." indeterminate size="huge" />
        </Dimmer>
      )
    }
    let { circle } = this.props
    return (
      <Container text= { true } textAlign="center" >
        <Image src="/images/bg.jpg" fluid style={{ height: "200px" }} alt="group info" shape="rounded" />
        <Header content={ circle.description } />
        <Divider section />
        <Grid>
          <Grid.Column textAlign="center" width={8}>
            <Icon name="users" /> 120 Fellows
          </Grid.Column>
          <Grid.Column textAlign="center" width={8}>
            <Icon name="inbox" /> 30 Polls
          </Grid.Column>
        </Grid>
        <Divider section />        
        <Segment>
          <Header content="Fellows"/>
          <Button as={ Link } to={ `/fellows` } content="View Fellows" icon='right arrow' labelPosition='left' color="blue" />
          <Button style={{ marginBottom: "20px" }} content="Add Fellow" icon='add' labelPosition='right' color="blue" />
          <UserList />
        </Segment>
        <Segment>
          <Header content="Poll"/>
          <Button as={ Link } to={ `/polls` } content="View Polls" color="blue" />
          <Button as={ Link } to={ `/create/poll` } content="Add Poll" icon='add' labelPosition='right' color="blue" />
        </Segment>
        Created: { (new Date(circle.createdAt)).toDateString() }
        Creator: { circle.creator && circle.creator.username }
      </Container>
    )
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Circle);
