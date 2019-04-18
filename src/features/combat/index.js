import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { range, sample } from "../../array";
import store from "../../config/store";
import "./style.css";

function Combat(props) {
  let [HP, setHP] = useState([1, 3]);
  let [enemy, setEnemy] = useState(props.enemy);

  useEffect(() => {
    window.addEventListener("keydown", handleCombatKeys);
    return () => {
      window.removeEventListener("keydown", handleCombatKeys);
    };
  }, []);

  const handleCombatKeys = e => {
    if (store.getState().modal.visible) {
      e.preventDefault();
      switch (e.keyCode) {
        case 17:
          return HP[1] ? setHP([100, --HP[1]]) : null;
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
  };
  return (
    <div className="container">
      <div className="player">
        <h4>You</h4>
        <img src={`enemies/player.png`} alt="Enemy" />
        <h4>HP: {HP[0]} | Lvl: 10</h4>
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
        <h4 className="combat-text">You have {HP[1]} potions!</h4>
        <h4 className="combat-text">A wild {enemy.name} appears!</h4>
      </div>
      <div className="enemy">
        <h4 style={{ textTransform: "capitalize" }}>{enemy.name}</h4>
        <img src={`enemies/${enemy.image}`} alt="Enemy" />
        <h4>
          HP: {enemy.hp} | Lvl: {enemy.hp / enemy.const}
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

export default connect(mapStateToProps)(Combat);
