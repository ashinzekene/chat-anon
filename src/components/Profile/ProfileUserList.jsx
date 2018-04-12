import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';

import Async from '../../HOCs/Async';
import { BASENAME, AVATAR_URL } from '../../actions';
import Link from 'react-router-dom/Link';

const ProfileUserList = ({ users, emptyText }) => (
  <div style={{ textAlign: "left" }}>
    {
      users.length === 0 ? (
        <div style={ styles.emptyText }>{emptyText}</div>
      ) : (
      <Item.Group divided unstackable>
        { users.map((user, i) => (
          <Item as={Link} to={`/@${user.username}`} key={`item${i}`}>
            <img alt={user.username} 
              height="50px" width="50px" 
              className="user-list-img" 
              src={ user.avatar_url ? BASENAME + user.avatar_url : BASENAME + AVATAR_URL} />
            <Item.Content>
              <Item.Description key={`meta${i}`} >
                {`@${user.username}`}
              </Item.Description>
              <Item.Meta key={`header${i}`}>
                {`${user.first_name || ""} ${user.last_name || ""}`}
              </Item.Meta>
            </Item.Content>
          </Item>
        )) }
      </Item.Group>
      )
    }
  </div>
)

const styles = {
  emptyText: {
    padding: "20px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: 500
  }
}

Async.PropTypes = {
  users: PropTypes.array.isRequired,
  onLoad: PropTypes.func.isRequired,
  emptyText: PropTypes.string.isRequired,
}

export default Async('users')(ProfileUserList);