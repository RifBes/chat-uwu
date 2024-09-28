import React from "react";
import "./styles/main.scss";
import "./styles/stars.scss";
import AppRoute from "./components/AppRoute";

const App = () => {
  return (
    <div className="background center">
      {/* <div class="stars">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
      </div> */}
      <AppRoute />
    </div>
  );
};

export default App;
