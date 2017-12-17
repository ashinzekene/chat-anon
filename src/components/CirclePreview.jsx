import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

const CirclePreview = props => (
  <Card onClick={ props.onClick() } as={ Link } to={`/circle/${props._id}`} >
    <Card.Content header={ props.name } />
    <Card.Content meta={ props.description } />
    <Card.Content extra>
      <Icon name="group" />
      { props.fellows.length } Fellows
      <Icon name="spy" />
      { props.creator && props.creator.username }  
    </Card.Content>
  </Card>
);

export default CirclePreview;
