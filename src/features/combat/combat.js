import React from "react";
import { connect } from "react-redux";
import { range, sample } from "../../array";
import store from "../../config/store";

function combatModal(props) {
  return (
    <div className="container">
      <div className="player">
        <h4>You</h4>
        <img src={`enemies/player.png`} alt="Enemy" />
        <h4>HP: {store.getState().combat.myHP} | Lvl: 10</h4>
      </div>
      <div className="menu">
        <div className="menu-item">
          <img src="buttons/ctrl.png" alt="Heal" />
          <div>
            <h4>to heal</h4>
          </div>
        </div>
        <div className="menu-item">
          <img src="buttons/spacebar.png" alt="Attack" />
          <div>
            <h4>to attack</h4>
          </div>
        </div>
        <h4 className="combat-text">Damage: 100</h4>
        <h4 className="combat-text">A wild {props.enemy.name} appears!</h4>
      </div>
      <div className="enemy">
        <h4>{props.enemy.name}</h4>
        <img src={`enemies/${props.enemy.image}`} alt="Enemy" />
        <h4>
          HP: {props.enemy.hp} | Lvl: {props.enemy.hp / props.enemy.const}
        </h4>
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
