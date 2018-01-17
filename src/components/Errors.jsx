import React, { Component } from "react";

import { Message } from "semantic-ui-react";

class Errors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
    this.removeError = this.removeError.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.error("NEW PROPS", nextProps)
    if (nextProps.errors && nextProps.errors !== this.props.errors) {
      this.setState({ errors: [...nextProps.errors]})
    }
  }

  removeError(i) {
    return () => {
      this.state.errors.filter((err, ind) => ind !== i )
    }
  }
  
  render() {
    let { errors } = this.state
    return(
      errors && errors.map((error, i) => (
        <Message error content={error} key={ "msg-"+i } onDismiss={ this.props.remove(i) } size="tiny" visible />
      ))
    )
  }
}

export default Errors;