import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
// @ts-ignore
const Header = ({title, onAdd, showAdd}) => {


    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text={showAdd ? 'Close' : 'Add'} color={showAdd ? 'gray' : 'steelblue'} onClick={onAdd}/>
        </header>
    )
}

Header.propTypes =
{
    title: PropTypes.string.isRequired,
}


// const myStyle = {
//     color: "white",
//     backgroundColor: "DodgerBlue",
//     padding: "10px",
//     fontFamily: "Arial",
//     textAlign: "center" as 'center'
// };

export default Header
