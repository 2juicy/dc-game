import React from "react";
import { connect } from "react-redux";
import Combat from "./combat";
import "./style.css";

function handleKeyDown(e) {
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
    default:
      console.log(e.keyCode);
  }
}

function keyCapture(props) {
  window.addEventListener("keydown", e => {
    if (props.visible) handleKeyDown(e);
  });
}

function renderModal(props) {
  switch (props.type) {
    case "COMBAT":
      return <Combat />;
    default:
  }
}

function Modal(props) {
  keyCapture(props);
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
    startCombat: type => {
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
