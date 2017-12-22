import React from "react";
import Item from "semantic-ui-react/dist/commonjs/views/Item/Item";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";


const UserList = props => (
  <div style={{ textAlign: "left" }}>
    <Item.Group divided unstackable>
      { props.users.map((user, i) => (
        <Item key={`item${i}`}>
          <img alt={ user.username} height="50px" width="50px" style={{ marginRight: "20px", verticalAlign: "middle", borderRadius: "50%" }} src={ user.image} />
          <Item.Content>
            <Item.Description key={`header${i}`} as='a'>{`${ user.first_name} ${ user.last_name}`}
              <Button size="mini" floated="right" circular icon="minus" />
            </Item.Description>
            <Item.Meta key={`meta${i}`} >{`@${ user.username}`}</Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </div>
)
export default UserList
