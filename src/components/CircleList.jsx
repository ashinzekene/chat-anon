import React from 'react';
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';

import CirclePreview from "./CirclePreview";
import Async from '../HOCs/Async';

const CircleList = props => {
  const selectCircle = circle => () => props.selectCircle(circle)
  return (
    <CardGroup className="card-list" style={{ padding: "10px" }} stackable itemsPerRow={2}>
      {
        props.circles.map((circle, ind) => (
          <CirclePreview key={ind} onClick={ selectCircle(circle) } { ...circle } />
        ))
      }
    </CardGroup>
  )
}

export default Async('circles')(CircleList);