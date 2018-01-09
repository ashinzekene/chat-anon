import React from 'react'
import { Segment } from 'semantic-ui-react'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import { APP_NAME } from '../actions/index';

const Home = (props) => (
  <Segment basic style={{ paddingTop: "30px"}}>
    <Header style={{ textAlign: "center" }} size="huge">{ APP_NAME }</Header>
    <h2 style={{ fontWeight: 200, textAlign: "center" }} >Create Polls. Understand what people feel, find out people's views</h2>
  </Segment>
)

export default Home
