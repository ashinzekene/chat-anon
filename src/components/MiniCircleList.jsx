import React from "react";
import Item from "semantic-ui-react/dist/commonjs/views/Item/Item";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Async from "../HOCs/Async";

const MiniCircleList = props => (
  <div style={{ textAlign: "left" }}>
    <Item.Group divided unstackable>
      {props.circles.map((circle, i) => (
        <Item key={`item${i}`}>
          <Item.Content>
            <Item.Description key={`header${i}`} as='a'>{ circle.name }
              { circle.canVote && <Button floated="right" circular icon="inbox" />}
            </Item.Description>
            <Item.Meta key={`meta${i}`} >{ circle.description }</Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </div>
)

export default Async('circles')(MiniCircleList)
