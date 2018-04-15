import React from 'react';
import { Grid } from 'semantic-ui-react'
import MySidebarLG from './MySidebarLG';
import MyHeader from './MyHeader';
import Main from './Main';

const LargeScreen = props => (
  <Grid>
    <Grid.Row>
      <MyHeader
        currentUser={props.currentUser}
        history={props.history}
        sidebarVisible={props.sidebarVisible}
        toggleSidebar={props.toggleSidebar}
        header={props.header} />
    </Grid.Row>
    <Grid.Row style={{ height: "100vh" }}>
      <MySidebarLG onLogout={props.logOut}
        currentUser={props.currentUser}
        toggleSidebar={props.toggleSidebar} visible={props.sidebarVisible} />
      <Grid.Column tablet="10" computer="11" widescreen="11" largeScreen="12">
        <Main />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default LargeScreen;