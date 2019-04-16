import React from "react";
import { connect } from "react-redux";
import { range, sample } from "../../array";

function combatModal(props) {
  return (
    <div>
      <div className="enemy">
        <img src={`enemies/${props.enemy.image}`} alt="enemy" />
      </div>
      <div className="menu" />
    </div>
  );
}

function randomEnemy(enemies, levelRange) {
  const data = sample(enemies);
  return {
    ...data,
    hp: parseInt(data.const * sample(range(...levelRange)))
  };
}

function mapStateToProps(state) {
  return {
    map: state.map,
    enemy: randomEnemy(state.map.enemies, state.map.levelRange)
  };
}

export default connect(mapStateToProps)(combatModal);
