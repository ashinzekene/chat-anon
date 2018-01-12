import React, { Component } from 'react';
import propTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import UserList from '../UserList'
import agent from '../../agent';
import { CIRCLE_FELLOWS_REQUEST, SEARCH_USERS, CHANGE_HEADER } from '../../actions/index';
import { connect } from "react-redux";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';

const mapDispatchToProps = dispatch => ({
  searchUsers: payload => dispatch({ type: SEARCH_USERS, payload}),
  onLoad: () => dispatch({ type: CHANGE_HEADER, header: { title: "Add Fellows", back: true } })
})

const mapStateToProps = state => ({
  users: state.search.users,
})

class AddFellow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      users: []
    }
    this.onChange = this.onChange.bind(this)
    this.filterOut = this.filterOut.bind(this)
  }

  onChange(e, { value }) {
    this.setState({ value })
    if (value.length < 3 ) return
    this.props.searchUsers(agent.User.search(value ))
  }
  
  filterOut() {
    let { users, fellows } = this.props
    console.log(users, fellows)
    // Removes fellows already in the circle from the list
    return users.filter(user => {
      // Looking for the presence of a user in fellow list, filters out the user if found
      return fellows.findIndex(fellow => fellow._id === user._id) === -1
    })
  }
  render() {
    let { value } = this.state
    let unaddedUsers = this.filterOut()
    return (
      <Container>
      <Input
      fluid
      size="large"
      value={ value }
      icon='search'
      onChange={ this.onChange }
      placeholder='Search...' />
      <div style={{ paddingTop: "40px" }}>
        <UserList noLink users={ unaddedUsers } additional={ addButton } />
      </div>
    </Container>
    )
  }
}


AddFellow.propTypes = {
  fellows: propTypes.array.isRequired,
  users: propTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFellow);