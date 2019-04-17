import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../../config/store";
import Combat from "../../features/combat";
import "./style.css";

function Modal(props) {
  useEffect(() => {
    window.addEventListener("keydown", e => {
      if (store.getState().modal.visible) handleCombatKeys(e);
    });
  }, []);

  const [HP, setHP] = useState([99]);

  function handleCombatKeys(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 17:
        return setHP([100]);
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

  return (
    <div
      style={{ display: props.visible ? "block" : "none" }}
      className="modal"
    >
      <h1>COMBAT</h1>
      {!props.visible ? null : <Combat HP={HP} />}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state.modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startCombat: () => {
      dispatch({ type: "START_COMBAT" });
    },
    endCombat: () => {
      dispatch({ type: "END_COMBAT" });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
