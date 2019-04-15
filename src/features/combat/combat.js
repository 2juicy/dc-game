import React from "react";
import { connect } from "react-redux";
import { range, sample } from "../../array";

function combatModal(props) {
  return (
    <div>
      <div className="enemy">
        <img src={`monsters/${props.enemy.image}`} alt="enemy" />
      </div>
      <div className="menu" />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

export default connect(mapStateToProps)(combatModal);
