import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea/TextArea";
import { APP_NAME } from "../constants";

class CreatePoll extends Component {
  componentDidMount() {
    this.props.changeHeader({ title: APP_NAME, back: true })
  }
  render() {
    return (
      <Form size="big" style={ formStyle }>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ textAlign: "center" }}>Create a Circle</h1>
          <Form.Field>
            <label>Question</label>
            <input placeholder='question' />
          </Form.Field>
          <Form.Field>
            <label>Comments</label>
            <TextArea placeholder='Tell us more' />
          </Form.Field>
          <Button fluid size="big" animated='fade'>
            <Button.Content visible>
              Create Poll
            </Button.Content>
            <Button.Content hidden>
              Let's go
            </Button.Content>
          </Button>
        </div>
      </Form>
    )
  }
}

const formStyle = {
  padding: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifyItems:"center",
}

export default CreatePoll