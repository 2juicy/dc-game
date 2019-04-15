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

function mapStateToProps(state) {
  return {
    ...state.fight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startCombat: type => {
      dispatch({ type: "START_COMBAT" });
    },
    endCombat: type => {
      dispatch({ type: "END_COMBAT" });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Combat);
