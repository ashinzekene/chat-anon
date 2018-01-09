import React, { Component } from 'react';
import propTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import UserList from '../UserList'
import agent from '../../agent';
import { CIRCLE_FELLOWS_REQUEST, SEARCH_USERS } from '../../actions/index';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  searchUsers: payload => dispatch({ type: SEARCH_USERS, payload}),
})

const mapStateToProps = state => ({
  users: state.search.users,
})

class AddFellow extends Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e, { value }) {
    this.setState({ value })
    if (value.length < 3 ) return
    this.props.searchUsers(agent.User.search(value ))
  }
  
  render() {
    let { value } = this.state
    let { users } = this.props
    return (
      <Container>
      <Input
      fluid
      size="large"
      icon='search'
      value={ value }
      onChange={ this.onChange }
      placeholder='Search...' />
      <div style={{ paddingTop: "40px" }}>
        <UserList noLink users={ users } />
      </div>
    </Container>
    )
  }
}

AddFellow.propTypes = {
  fellows: propTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFellow);