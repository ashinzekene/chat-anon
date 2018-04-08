import React from 'react';
import PropTypes from 'prop-types';
import { Item, Button } from 'semantic-ui-react';
import Async from '../../HOCs/Async';
import Link from 'react-router-dom/Link';

const ProfileCircleList = ({ circles, emptyText }) => (
  <div style={{ textAlign: "left" }}>
    { 
      circles.length === 0 ? (
        <div style={ styles.emptyText }>{emptyText}</div>      
    ) : (
    <Item.Group divided unstackable>
      {circles.map((circle, i) => (
        <Item as={Link} to={`/circle/${circle.handle}`} key={`item${i}`}>
          <Item.Content>
            <Item.Description key={`header${i}`}>{circle.name}
              {circle.canVote && <Button floated="right" circular icon="inbox" />}
            </Item.Description>
            <Item.Meta key={`meta${i}`} >{circle.description}</Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
    )}
  </div>
)

const styles = {
  emptyText: {
    padding: "20px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: 500
  }
}

Async.PropTypes = {
  circles: PropTypes.array.isRequired,
  emptyText: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
}

export default Async('circles')(ProfileCircleList);