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
    let { circles } = this.props
    if(circles.length === 0) {
      return (
        <h3 style={{ textAlign: "center", paddingTop: "40px" }}>You are not presently in any circle. You can create one or join an already existing circle</h3>
      )
    }
    return (
      <CardGroup className="card-list" style={{ padding: "10px" }} stackable itemsPerRow={2}>
        {
          circles.map((circle, ind) => (
            <CirclePreview key={ind} onClick={ this.selectCircle(circle) } { ...circle } />
          ))
        }
      </CardGroup>
    )
  }
}

export default Async('circles')(CircleList);