import React, { Component } from 'react'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { connect } from "react-redux";

import MiniCircleList from './MiniCircleList.jsx'
import MiniPollList from './MiniPollList.jsx'
import UserList from './UserList.jsx'
import { SEARCH_POLLS, SEARCH_USERS, SEARCH_CIRCLES } from '../actions/index';
import agent from '../agent';

const maopStateToProps = state => ({
  users: state.search.users,
  polls: state.search.polls,
  circles: state.search.circles,
})

const mapDispatchToProps = dispatch => ({
  searchPolls: payload => dispatch({ type: SEARCH_POLLS, payload}),
  searchUsers: payload => dispatch({ type: SEARCH_USERS , payload}),
  searchCircles: payload => dispatch({ type: SEARCH_CIRCLES , payload}),
})

class Explore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "polls",
      value: ""
    }
    this.onChange =this.onChange.bind(this)
    this.onDropdownChange =this.onDropdownChange.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
  }

  onDropdownChange(e, { value }) {
    this.setState({ type: value })
  }

  onChange(e, { value }) {
    this.setState({ value })
    let { type } = this.state
    if (value.length < 3 ) return
    if (type === 'polls') {
      this.props.searchPolls(agent.Poll.search(value ))
    }
    if (type === 'circles') {
      this.props.searchCircles(agent.Circle.search(value ))
    }
    if (type === 'users') {
      this.props.searchUsers(agent.User.search(value ))
    }
  }

  fetchResults() {
    let { value } = this.state
    if (value === 'polls') {
      this.props.searchPolls('polls')
    }
  }

  render() {
    let { type, value } = this.state
    let { circles, polls, users } = this.props
    return (
    <Container>
       <Input
       label={<Dropdown onChange={ this.onDropdownChange } defaultValue={ type } options={options} />}
       fluid
       value={ value }
       onChange={ this.onChange }
       size="large"
       icon='search'
       placeholder='Search...' />
       <div style={{ paddingTop: "40px" }}>
         { type === 'polls' && <MiniPollList polls={ polls } /> }
         { type === 'circles' && <MiniCircleList circles={ circles } /> }
         { type === 'users' && <UserList users={ users } /> }
       </div>
     </Container>
    )
  }
}

const options = [
  { key: 'polls', text: 'Polls', value: 'polls' },
  { key: 'circles', text: 'Circles', value: 'circles' },
  { key: 'users', text: 'Users', value: 'users' },
]

export default connect(maopStateToProps, mapDispatchToProps)(Explore);
