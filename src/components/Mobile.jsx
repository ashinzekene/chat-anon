import React from 'react';
import Main from './Main'
import MySidebar from './MySidebar';
import MyHeader from './MyHeader';
import { Sidebar, Segment } from "semantic-ui-react";
import { SIDEBAR_TOGGLE, LOGOUT } from '../actions';

const Mobile = props => (
  <div>
    <MyHeader
      currentUser={props.currentUser}
      history={props.history}
      sidebarVisible={props.sidebarVisible}
      toggleSidebar={props.toggleSidebar}
      header={props.header} />
    <Sidebar.Pushable style={{ height: "100vh" }} as={Segment}>
      <MySidebar onLogout={props.logOut}
        currentUser={props.currentUser}
        toggleSidebar={props.toggleSidebar} visible={props.sidebarVisible} />
      <Sidebar.Pusher className="full-height" style={{ paddingTop: "80px" }}>
        <Main />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
)

export default Mobile;