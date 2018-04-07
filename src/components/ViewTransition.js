import React, { Component } from 'react'
import { Animated } from 'react-native'

export class ViewTransition extends Component {
  state = {
    opacity: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, timing: 750 }).start()
  }

  render() {
    const { opacity } = this.state

    return (
      <Animated.View style={[this.props.style, { opacity }]}>{this.props.children}</Animated.View>
    )
  }
}
