import React from "react";
import Item from "semantic-ui-react/dist/commonjs/views/Item/Item";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";

import Async from "../HOCs/Async";
import { AVATAR_URL, USER_SELECTED } from "../actions/index";

const mapDispatchToProps = dispatch => ({
  onSelect: payload => () => dispatch({ type: USER_SELECTED, payload })
})

const UserList = ({ users, onSelect, noLink }) => {
  if(noLink) {
    return (
      <div style={{ textAlign: "left" }}>
      <Item.Group divided unstackable>
        { users.map((user, i) => (
          <Item key={`item${i}`}>
            <img alt={user.username} height="50px" width="50px" className="user-list-img" src={user.avatar_url || AVATAR_URL} />
            <Item.Content>
              <Item.Description key={`meta${i}`} >
                {`@${user.username}`}
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
  }
  return (
    <div style={{ textAlign: "left" }}>
      <Item.Group divided unstackable>
        { users.map((user, i) => (
          <Item as={Link} onClick={onSelect(user)} to={`/@${user.username}`} key={`item${i}`}>
            <img alt={user.username} height="50px" width="50px" className="user-list-img" src={user.avatar_url || AVATAR_URL} />
            <Item.Content>
              <Item.Description key={`meta${i}`} >
                {`@${user.username}`}
                <Button size="mini" floated="right" circular icon="minus" />
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
}

export default connect(null, mapDispatchToProps)(Async('users')(UserList))
