import React from 'react'
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

const MyHeaderButton =props => {
  let myButton
  if (props.isCurrentUser) {
    myButton = <Button floated="right" size="large" content="Edit Profile"/> 
  } else {
    myButton = <Button floated="right" size="large" content={ props.user.following ? "Unfollow" : "Follow" }/>
  }

  return (
    myButton
  )
}

export default MyHeaderButton