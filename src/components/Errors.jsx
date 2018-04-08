import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import propTypes from 'prop-types' 

class Errors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors && nextProps.errors !== this.props.errors) {
      this.setState({ errors: [...nextProps.errors]})
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

Errors.propTypes = {
  remove: propTypes.func,
  errors: propTypes.array
}

export default Errors;