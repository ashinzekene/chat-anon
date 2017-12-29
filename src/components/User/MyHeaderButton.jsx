import React from 'react'
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Link from 'react-router-dom/Link';

const MyHeaderButton =props => {
  let myButton
  if (props.isCurrentUser) {
    myButton = <Button floated="right" size="large" as={ Link } to="/settings" content="Edit Profile"/> 
  } else {
    myButton = <Button floated="right" size="large" content={ props.user.following ? "Unfollow" : "Follow" }/>
  }

  return (
    myButton
  )
}

export default MyHeaderButton