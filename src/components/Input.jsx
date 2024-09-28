import React from "react";
import "../styles/input.scss";

const Input = ({
  className,
  classNameWrapper,
  name,
  handleChange,
  placeholder,
  inits,
}) => {
  return (
    <div className={`input-wrapper ${classNameWrapper || ""}`}>
      <input
        className={`input ${className || ""}`}
        id={inits}
        autoComplete="off"
        type="text"
        name={inits}
        placeholder=""
        value={name}
        onChange={handleChange}
        required
      />
      <label className="label" htmlFor={inits}>
        {inits}
      </label>
    </div>
  );
};

export default Input;
