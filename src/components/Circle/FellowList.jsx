import React from 'react';
import propTypes from 'prop-types';
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";

import UserList from '../UserList'
import Link from 'react-router-dom/Link';

const FellowList = props => (
  <Segment style={{ marginBottom: "20px" }}>
    <Header content="Fellows"/>
    <Button content="Add Admin" icon='add' labelPosition='left' />
    <Button style={{ marginBottom: "20px" }} as={ Link } to={ `/circle/${props.circleName}/add` } content="Add Fellow" icon='add' labelPosition='right' />
    <UserList onLoad={ props.onLoad } users={ props.fellows } />
  </Segment> 
)

FellowList.propTypes= {
  circleName: propTypes.string.isRequired,
  onLoad: propTypes.func.isRequired,
  fellows: propTypes.array.isRequired
}

export default FellowList;
