import React from 'react';
const Button = ({
    text,
    value,
    selected,
    clicked
}) => {
    return (
        <div className="button-container" >
            <button onClick={clicked} value={value} className={selected ? "selected-button" : "unselected-button"}>{text}</button>
        </div>
    );
};

export default Button;
