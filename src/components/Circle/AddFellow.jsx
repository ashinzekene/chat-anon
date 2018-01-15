import React, { Component } from 'react';
import propTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import agent from '../../agent';
import { SEARCH_USERS, CHANGE_HEADER, AVATAR_URL, CIRCLE_FELLOW_ADDED } from '../../actions/index';
import { connect } from "react-redux";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';

const mapDispatchToProps = dispatch => ({
  searchUsers: payload => dispatch({ type: SEARCH_USERS, payload }),
  onLoad: () => dispatch({ type: CHANGE_HEADER, header: { title: "Add Fellows", back: true } }),
  addFellow: (userId, circleId) => dispatch({ type: CIRCLE_FELLOW_ADDED, payload: agent.Circle.addFellow(userId, circleId) }),
})

const mapStateToProps = state => ({
  users: state.search.users,
  circle: state.circle
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
    this.addFellow = this.addFellow.bind(this)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  addFellow(id) {
    return () => {
      this.props.addFellow(id , this.props.circle._id)
    }
  }

  onChange(e, { value }) {
    this.setState({ value })
    if (value.length < 3) return
    this.props.searchUsers(agent.User.search(value))
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
          value={value}
          icon='search'
          onChange={this.onChange}
          placeholder='Search...' />
        <div style={{ paddingTop: "40px" }}>
          <AddFellowList fellows={unaddedUsers} addFellow={ this.addFellow } />
        </div>
      </Container>
    )
  }
}


const AddFellowList = ({ fellows, addFellow }) => (
  <div style={{ textAlign: "left" }}>
    <Item.Group divided unstackable>
      {fellows.map((user, i) => (
        <Item key={`item${i}`}>
          <img alt={user.username} height="50px" width="50px" className="user-list-img" src={user.avatar_url || AVATAR_URL} />
          <Item.Content>
            <Item.Description key={`meta${i}`} >
              {`@${user.username}`}
            <Button floated="right" circular icon="add user" onClick={ addFellow(user._id) } />
            </Item.Description>
            <Item.Meta key={`header${i}`}>
              {`${user.first_name || ""} ${user.last_name || ""}`}
            </Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </div>
)

AddFellow.propTypes = {
  fellows: propTypes.array.isRequired,
  users: propTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFellow);