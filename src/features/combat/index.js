import React from "react";
import "./style.css";

function Combat(props) {
  return (
    <div className="container">
      <div className="player">
        <h4>You</h4>
        <img src={`enemies/player.png`} alt="Enemy" />
        <h4>HP: ?? | Lvl: 1</h4>
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
        <h4 className="combat-text">You have ?? potions!</h4>
        <h4 className="combat-text">A wild {props.enemy.name} appears!</h4>
      </div>
      <div className="enemy">
        <h4 style={{ textTransform: "capitalize" }}>{props.enemy.name}</h4>
        <img src={`enemies/${props.enemy.image}`} alt="Enemy" />
        <h4>
          HP: {props.enemy.hp} | Lvl: {props.enemy.hp / props.enemy.const}
        </h4>
      </div>
    </div>
  );
}

export default Combat;
