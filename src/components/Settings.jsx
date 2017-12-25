import React, { Component } from "react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form/Form";

class Settings extends Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Input label="First Name" />
          <Form.Input label="Lasr Name" />
        </Form.Group>
      </Form>
    )
  }
}