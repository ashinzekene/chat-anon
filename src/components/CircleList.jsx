import React, { Component } from 'react';
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';

import CirclePreview from "./CirclePreview";
import Async from '../HOCs/Async';
import { APP_NAME } from '../actions';

class CircleList extends Component {
  constructor(props) {
    super(props)
    this.selectCircle = this.selectCircle.bind(this)
  }
  componentDidMount(){
    this.props.changeHeader({ title: APP_NAME, back: false })
  }
  selectCircle(circle) {
    return () => this.props.selectCircle(circle)
  }
  render() {
    return (
      <CardGroup className="card-list" style={{ padding: "10px" }} stackable itemsPerRow={2}>
        {
          this.props.circles.map((circle, ind) => (
            <CirclePreview key={ind} onClick={ this.selectCircle(circle) } { ...circle } />
          ))
        }
      </CardGroup>
    )
  }
}

export default Async('circles')(CircleList);