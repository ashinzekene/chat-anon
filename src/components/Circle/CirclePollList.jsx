import React from 'react';
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Link from 'react-router-dom/Link';

import MiniPollList from '../MiniPollList'

const CirclePollList = props => (
  <Segment style={{ marginBottom: "20px" }}>
    <Header content="Polls"/>
    <Button style={{ marginBottom: "20px" }} content="Delete Poll" icon='minus' labelPosition='left' />
    <Button style={{ marginBottom: "20px" }} as={ Link } to={ `/create/polls` } content="Create Poll" icon='add' labelPosition='right' />
    <MiniPollList onLoad={ props.onLoad } polls={ props.polls } />
  </Segment>
)

export default CirclePollList;