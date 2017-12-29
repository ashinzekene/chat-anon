import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, Icon } from 'semantic-ui-react';
import { CIRCLE_SELECTED } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  onSelect: circle => () => dispatch({ type: CIRCLE_SELECTED, circle }) 
}) 


const CirclePreview = props => (
  <Card className="circle-preview" onClick={ props.onSelect(props) } as={ Link } to={`/circle/${props.handle}`} >
    <Card.Content header={ props.name } />
    <Card.Content meta={ props.description } />
    <Card.Content extra>
      <Icon name="group" />
      { props.fellows && props.fellows.length } Fellows
      <div style={{ float: "right" }} >
        <Icon name="spy" />
        { props.creator && props.creator.username }  
      </div>
    </Card.Content>
  </Card>
);

export default connect(null, mapDispatchToProps)(CirclePreview);
