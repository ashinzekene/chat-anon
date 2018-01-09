import React, { Component } from 'react';
import propTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import UserList from '../UserList'

class AddFellow extends Component {
  render() {
    let { users } = this.props
    return (
      <Container>
      <Input
      fluid
      size="large"
      icon='search'
      placeholder='Search...' />
      <div style={{ paddingTop: "40px" }}>
        <UserList users={ users } />
      </div>
    </Container>
    )
  }
}

AddFellow.propTypes = {
  users: propTypes.array.isRequired
}

export default AddFellow;