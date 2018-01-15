import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";

import Link from 'react-router-dom/Link';
import { AVATAR_URL } from '../../actions/index';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm/Confirm';

class FellowList extends Component {
  constructor(props) {
    super(props)
    this.confirmRemove = this.confirmRemove.bind(this)
    this.removeFellow = this.removeFellow.bind(this)
    this.state = {
      openConfirm: false,
      currentFellow: {},
    }
  }

  confirmRemove(fellow) {
    return () => {
      this.setState({ currentFellow: fellow, openConfirm: true })
    }
  }

  removeFellow(remove) {
    return () => {
      if (remove) {
        this.props.removeFellow(this.state.currentFellow._id)
      }
      this.setState({
        openConfirm: false,
        currentFellow: {},
      })
    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    const { openConfirm, currentFellow } = this.state
    return (
      <Segment style={{ marginBottom: "20px" }}>
        <Header content="Fellows" />
        {this.props.isAdmin && <Button content="Add Admin" icon='add' labelPosition='left' />}
        {!this.props.isAdmin && <Button style={{ marginBottom: "20px" }} as={Link} to={`/circle/${this.props.circleName}/add`} content="Add Fellow" icon='add' labelPosition='right' />}
        <div style={{ textAlign: "left" }}>
          <Item.Group divided unstackable>
            {this.props.fellows.map((user, i) => (
              <Item key={`item${i}`}>
                <img alt={user.username} height="50px" width="50px" className="user-list-img" src={user.avatar_url || AVATAR_URL} />
                <Item.Content>
                  <Item.Description as={Link} to={`/@${user.username}`} key={`meta${i}`} >
                    {`@${user.username}`}
                  </Item.Description>
                  <Button circular onClick={this.confirmRemove(user)} floated="right" icon="remove user" />
                  <Item.Meta key={`header${i}`}>
                    {`${user.first_name || ""} ${user.last_name || ""}`}
                  </Item.Meta>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </div>
        <Confirm
          open={openConfirm}
          header={`Remove ${currentFellow.username}?`}
          onConfirm={this.removeFellow(true)}
          onCancel={this.removeFellow(false)}
          content={`${currentFellow.username} would be removed`} />
      </Segment>
    )
  }
}

FellowList.propTypes = {
  circleName: propTypes.string.isRequired,
  onLoad: propTypes.func.isRequired,
  fellows: propTypes.array.isRequired
}

export default FellowList;
