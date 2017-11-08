import React, { Component } from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { connect } from 'react-redux';
import agent from '../../agent';
import { CIRCLE_PAGE_LOADED, CIRCLE_PAGE_UNLOADED } from '../../actions/circleActions';
import { CHANGE_HEADER, RESET_HEADER } from '../../actions/actionTypes';

const mapStateToProps = state => ({
  circle: state.circle
})

const mapDispatchToProps = dispatch => ({
  changeHeader: header => dispatch({ type: CHANGE_HEADER, header }),  
  loadCircle: (payload) => dispatch({ type: CIRCLE_PAGE_LOADED, payload }),
  unload: () => dispatch({ type: RESET_HEADER })
})

class Circle extends Component {
  state = {}
  componentWillMount() {
    this.props.loadCircle(agent.Circle.get(this.props.match.params.id))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.circle.name && nextProps.circle !== this.props.circle) {
      nextProps.changeHeader({ title: nextProps.circle.name, back: true })     
    }
  }
  render() {
    if (!this.props.circle.name) 
    return (
      <Dimmer active page>
        <Loader content="Circle is coming..." indeterminate size="huge" />
      </Dimmer>
    )
    return (
      <Container text= { true } textAlign="center" >
        Created: { (new Date(this.props.circle.createdAt)).toDateString() }
        Creator: { this.props.circle.creator.name }
      </Container>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Circle);
