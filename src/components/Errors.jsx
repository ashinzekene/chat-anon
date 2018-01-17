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

  componentWillReceiveProps(newProps) {
    console.error("NEW PROPS", newProps)
    if (newProps.errors && newProps.errors !== this.props.errors) {
      this.setState({ errors: Object.assign({}, this.props.errors) })
    }
  }

  removeError(i) {
    return () => {
      this.state.errors.filter((err, ind) => ind !== i )
    }
  }
  
  render() {
    let { errors } = this.state
    console.log("ERRRRRRRRRROROORORORROROROR", errors)
    return(
      errors && errors.map((error, i) => (
        <Message error content={error} key={ "msg-"+i } onDismiss={ this.removeError(i) } />
      ))
    )
  }
}

export default Errors;