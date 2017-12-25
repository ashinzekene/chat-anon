import React from "react";
import Item from "semantic-ui-react/dist/commonjs/views/Item/Item";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Async from "../HOCs/Async";

const MiniPollList = props => (
  <div style={{ textAlign: "left" }}>
    <Item.Group divided unstackable>
      {props.polls.map((poll, i) => (
        <Item key={`item${i}`}>
          <Item.Content>
            <Item.Description key={`header${i}`} as='a'>{ poll.question}
              { poll.canVote && <Button floated="right" circular icon="inbox" />}
            </Item.Description>
            <Item.Meta key={`meta${i}`} >{ poll.comment}</Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </div>
)

export default Async('polls')(MiniPollList)
