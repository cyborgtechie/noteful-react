import React, { Component } from "react";
import PropTypes from "prop-types";

class NotefulError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops..Something funky has happend, please try later.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

NotefulError.propTypes = {
  children: PropTypes.array,
};
export default NotefulError;
