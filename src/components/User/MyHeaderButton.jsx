import React from 'react'
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Link from 'react-router-dom/Link';

const MyHeaderButton =({ user, isCurrentUser, currentUserIsFollowing }) => {
  const followOrUnfollow = () => {
    if (currentUserIsFollowing) {
      console.log("I would stop following you")
    } else {
      console.log("I would start following you")
    }
  }
  let myButton
  if (isCurrentUser) {
    myButton = <Button floated="right" size="large" as={ Link } to="/settings" content="Edit Profile"/> 
  } else {
    myButton = <Button onClick={ followOrUnfollow } floated="right" size="large" content={ currentUserIsFollowing ? "Unfollow" : "Follow" }/>
  }

  return (
    myButton
  )
}

export default MyHeaderButton