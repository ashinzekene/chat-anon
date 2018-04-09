import React from 'react'
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

const MyHeaderButton = ({ user, currentUserIsFollowing, isCurrentUser, follow, unfollow }) => {
  const followOrUnfollow = () => {
    if (currentUserIsFollowing) {
      unfollow(user._id)
    } else {
      follow(user._id)
    }
  }
  let myButton
  if (isCurrentUser) {
    myButton = <Button floated="right" size="large" as={Link} to="/settings" content="Edit Profile" />
  } else {
    myButton = <Button onClick={followOrUnfollow} floated="right" size="large" content={currentUserIsFollowing ? "Unfollow" : "Follow"} />
  }
  return (
    myButton
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHeaderButton);