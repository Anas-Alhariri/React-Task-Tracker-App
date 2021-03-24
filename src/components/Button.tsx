import React from "react";
import PropTypes from "prop-types";

// @ts-ignore
const Button = ({color, text, onClick}) => {

    return <button className='btn' style={{backgroundColor: color, minWidth: '110px'}} onClick={onClick}> {text}</button>
}

Button.defaultProps = {
    text: 'Button',
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
