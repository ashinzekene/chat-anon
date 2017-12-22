import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CIRCLE_SELECTED } from '../actions';
import  CirclePreview from "./CirclePreview";
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';

const mapDispatchToProps = dispatch => ({
  onSelect: (circle) => dispatch({ type: CIRCLE_SELECTED, circle }),
})

class CircleList extends Component {
  componentDidMount() {
    console.log("Circle list", this.props)
    this.props.onLoad()
  }

  selectPoll = circle => () => this.props.onSelect(circle)
  
  render() {
    if (this.props.circles && this.props.circles.length) {
      return (
        <CardGroup className="card-list" style={{ padding: "10px" }} stackable itemsPerRow={2}>
          {
            this.props.circles.map((circle, ind) => (
              <CirclePreview onClick={ this.selectPoll(circle) } key={ind} { ...circle } />
            ))
          }
        </CardGroup>
      )
    } else {
      return (
        <div>
          <h3>Here you will find your list of circles</h3>
        </div>
      )
    }
  }
}

export default connect(null, mapDispatchToProps)(CircleList);