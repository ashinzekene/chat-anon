import React, { Component } from 'react'
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';

const Async = propName => WrappedComponent => {
  return class MyAsync extends Component {
    componentDidMount() {
      this.props.hasOwnProperty('onLoad') && this.props.onLoad()
    }
    isEmpty(prop) {
      return prop == null ||
      (prop.hasOwnProperty("length") && prop.length === 0) ||
      (prop.constructor === "object" && Object.keys(prop).length) === 0
    }
    render() {
      return this.isEmpty(this.props[propName]) ?
       (
        <Loader active content={ `Loading ${propName}` } />
      ) : (
        <WrappedComponent { ...this.props} />
      )

    }
  }
}

export default Async
