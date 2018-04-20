import React from 'react';
import PropTypes from 'prop-types';
import { Item, Radio } from "semantic-ui-react";
import { BASENAME, AVATAR_URL } from '../../actions';

const AddFellows = ({ users, fellows, onChange }) => (
  <Item.Group divided unstackable>  
    {
      fellows.map((user, i) => (
        <Item key={`item${i}`}>
          <img alt={user.username}
            height="50px" width="50px"
            className="user-list-img"
            src={user.avatar_url ? BASENAME + user.avatar_url : BASENAME + AVATAR_URL} />
          <Item.Content>
            <Item.Description key={`meta${i}`} >
              {`@${user.text}`}
            </Item.Description>
          </Item.Content>
        </Item>
      ))
    }
    { users.map((user, i) => (
    <Item key={`item${i}`}>
      <img alt={user.username}
        height="50px" width="50px"
        className="user-list-img"
        src={user.avatar_url ? BASENAME + user.avatar_url : BASENAME + AVATAR_URL} />
      <Item.Content>
        <Item.Description key={`meta${i}`} >
          {`@${user.text}`}
          <Radio toggle onChange={ onChange(user) } />
        </Item.Description>
      </Item.Content>
    </Item>
  )) }
  </Item.Group>
)

AddFellows.propTypes = {
  users: PropTypes.array.isRequired, //.shape({ name: PropTypes.string.isRequired })
  fellows: PropTypes.array.isRequired,
  onChange: PropTypes.func
}

export default AddFellows