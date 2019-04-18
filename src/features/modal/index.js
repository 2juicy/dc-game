import React from "react";
import { connect } from "react-redux";
import Combat from "../../features/combat";
import "./style.css";

function Modal(props) {
  return (
    <div
      style={{ visibility: props.visible ? "visible" : "hidden" }}
      className="modal"
    >
      <h1>COMBAT</h1>
      {!props.visible ? null : <Combat />}
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
