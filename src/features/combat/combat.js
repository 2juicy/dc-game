import React from "react";
import { connect } from "react-redux";
import { range, sample } from "../../array";

function combatModal(props) {
  console.log(props.enemy);
  return (
    <div className="container">
      <div className="menu">
        <img src="buttons/spacebar.png" alt="Attack" />
        <div>
          <h4>to attack</h4>
        </div>
      </div>
      <div className="enemy">
        <img src={`enemies/${props.enemy.image}`} alt="Enemy" />
        <h4>HP: {props.enemy.hp}</h4>
      </div>
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
