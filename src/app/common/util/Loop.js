import { Component } from "react";
import ms from "ms";

class Loop extends Component {
  componentDidMount() {
    this.loop();
  }

  loop() {
    this.timeout = setTimeout(() => {
      this.forceUpdate();
      this.loop();
    }, ms(this.props.every));
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  render() {
    return this.props.children;
  }
}

export default Loop;
