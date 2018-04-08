import React, { Component } from 'react'
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Link from 'react-router-dom/Link';
import { connect } from "react-redux";
import agent from "../../agent";

import { FOLLOW_USER, UNFOLLOW_USER } from "../../actions";

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  follow: userId => dispatch({ type: FOLLOW_USER, payload: agent.User.follow(userId) }),
  unfollow: userId => dispatch({ type: UNFOLLOW_USER, payload: agent.User.unfollow(userId) })
})

class MyHeaderButton extends Component {
  constructor(props) {
    super(props)
  }
  followOrUnfollow = () => {
    const { user, currentUserIsFollowing, follow, unfollow } = this.props
    if (currentUserIsFollowing) {
      unfollow(user._id)
    } else {
      follow(user._id)
    }
  }
  render() {
    let myButton
    if (this.props.isCurrentUser) {
      myButton = <Button floated="right" size="large" as={Link} to="/settings" content="Edit Profile" />
    } else {
      myButton = <Button onClick={this.followOrUnfollow} floated="right" size="large" content={this.props.currentUserIsFollowing ? "Unfollow" : "Follow"} />
    }
    return (
      myButton
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHeaderButton);