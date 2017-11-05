import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react';

const PollSegment = props => (
  <Card as={Link} to={ `/poll/${props._id}` }>
    <Card.Content header={ props.question } />
    <Card.Content meta={ props.comment } />
    <Card.Content extra>
      <Icon name="favorite" />
      { props.options.reduce((ini, val) => ini+val.votes, 0) } votes
      <Icon name="group" />
      { props.circle.name }
    </Card.Content>
  </Card>
);

export default PollSegment;
