import React from "react";
import "../styles/input.scss";

type InputProps = {
  className?: string;
  classNameWrapper?: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  inits: string;
}

const Input = ({
  className,
  classNameWrapper,
  name,
  handleChange,
  placeholder,
  inits,
}: InputProps) => {
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
