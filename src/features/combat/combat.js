import React from "react";
import { connect } from "react-redux";
import { range, sample } from "../../array";
import combat from ".";

function combatModal(props) {
  return (
    <div>
      <div className="enemy">
        {/* add image of enemy */}
        <img src={`monsters/${props.enemy.image}`} />
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
