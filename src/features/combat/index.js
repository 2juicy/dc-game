import React from "react";
import { connect } from "react-redux";
import store from "../../config/store";
import Combat, { handleCombat } from "./combat";
import "./style.css";

function handleCombatKeys(e) {
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
      return handleCombat();
    default:
      console.log(e.keyCode);
  }
}

function keyCapture(component) {
  window.addEventListener("keydown", e => {
    if (store.getState().combat.visible) handleCombatKeys(e);
  });
  return component;
}

function renderModal(props) {
  switch (props.type) {
    case "COMBAT":
      return <Combat />;
    default:
  }
}

function Modal(props) {
  return (
    <div
      style={{ display: props.visible ? "block" : "none" }}
      className="modal"
    >
      <h1>{props.type}</h1>
      <div>{renderModal(props)}</div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state.combat
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
)(keyCapture(Modal));
