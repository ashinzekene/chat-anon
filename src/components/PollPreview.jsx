import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react';

const PollPreview = props => (
  <Card onClick={ props.onClick } as={Link} to={ `/poll/${props._id}` }>
      <Card.Content header={ props.question } />
      <Card.Content meta={ props.comment } />
      <Card.Content extra style={{ textTransform: "capitalize" }}>
        <Icon name="spy" />
        { props.creator && props.creator.username }
        <div style={{ float: "right" }} >
          <Icon name="group" />
          { props.circle.name }
        </div>
      </Card.Content>
  </Card>
);

export default PollPreview;
