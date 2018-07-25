import React from 'react';
import PropTypes from 'prop-types'

const Button = ({ onClick, className = '', children }) => {
  let button
  return (<button ref={(node) => button = node} type="button" className={className} onClick={onClick}>{children}</button>)
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
export default Button;