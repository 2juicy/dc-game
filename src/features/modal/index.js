import React, { useEffect } from "react";
import { connect } from "react-redux";
import Combat from "../../features/combat";
import store from "../../config/store";
import { range, sample } from "../../array";
import map from "../../maps/1";
import "./style.css";

function randomEnemy(enemies, levelRange) {
  const data = sample(enemies);
  return {
    ...data,
    hp: parseInt(data.const * sample(range(...levelRange)))
  };
}

function Modal(props) {
  useEffect(() => {
    window.addEventListener("keydown", handleCombatKeys);
    return () => {
      window.removeEventListener("keydown", handleCombatKeys);
    };
  }, []);

  const handleCombatKeys = e => {
    if (store.getState().modal.visible) {
      e.preventDefault();
      switch (e.keyCode) {
        case 37:
          return console.log("WEST");
        case 38:
          return console.log("NORTH");
        case 39:
          return console.log("EAST");
        case 40:
          return console.log("SOUTH");
        case 32:
          return store.dispatch({ type: "END_COMBAT" });
        default:
          console.log(e.keyCode);
      }
    }
  };

  const enemy = randomEnemy(map.enemies, map.levelRange);

  return (
    <div
      style={{ visibility: props.visible ? "visible" : "hidden" }}
      className="modal"
    >
      <h1>COMBAT</h1>
      {!props.visible ? null : <Combat enemy={enemy} />}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state.modal
  };
}

export default connect(mapStateToProps)(Modal);
