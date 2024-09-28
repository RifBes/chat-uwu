import React, { useState } from "react";
import "../styles/join.scss";
import { Link } from "react-router-dom";
import Input from "./Input";

const FIELSD = {
  USERNAME: "username",
  ROOM: "room",
};

const Join = () => {
  const { USERNAME, ROOM } = FIELSD;
  const [values, setValues] = useState({ [USERNAME]: "", [ROOM]: "" });
  const [warning, setWarning] = useState("");

  //   target - взяли инфу с input
  const handleChange = ({ target: { value, name } }) => {
    setWarning("");
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    // проверяем все ли поля ввелись
    const isDisabled = Object.values(values).some((value) => !value);

    if (isDisabled) {
      e.preventDefault();
      setWarning("Fill in all fields!! ( ˶°ㅁ°) !!");
    }
  };

  return (
    <div className="join-container">
      <h1 className="join-title">
        Join any room! <br /> ⸜(｡˃ ᵕ ˂ )⸝♡
      </h1>
      {warning && <div className="join-warning">{warning}</div>}
      <form className="join-form">
        <div className="join-form-inputs">
          <Input
            name={values[USERNAME]}
            inits="username"
            handleChange={handleChange}
            placeholder="Username"
          />
          <Input
            name={values[ROOM]}
            inits="room"
            handleChange={handleChange}
            placeholder="Room"
          />
        </div>
        <Link
          onClick={handleClick}
          to={{
            pathname: "/chat",
            search: `?username=${values[USERNAME]}&room=${values[ROOM]}`,
          }}
        >
          <button className="btn join-btn" type="submit">
            Join (˶˃ ᵕ ˂˶) .ᐟ.ᐟ
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Join;
