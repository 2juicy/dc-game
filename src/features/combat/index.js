import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default function Combat({ enemy, HP, enemyHP, potion }) {
  return (
    <div className="container">
      <div className="player">
        <h4>You</h4>
        <img src={`enemies/player.png`} alt="Enemy" />
        <h4>HP: {HP} | Lvl: 1</h4>
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
        <h4 className="combat-text">You have {potion} potions!</h4>
        <h4 className="combat-text">A wild {enemy.name} appears!</h4>
      </div>
      <div className="enemy">
        <h4 style={{ textTransform: "capitalize" }}>{enemy.name}</h4>
        <img src={`enemies/${enemy.image}`} alt="Enemy" />
        <h4>
          HP: {enemyHP} | Lvl: {enemy.hp / enemy.const}
        </h4>
      </div>
    </div>
  );
}

Combat.propTypes = {
  enemy: PropTypes.object.isRequired,
  enemyHP: PropTypes.number.isRequired,
  potion: PropTypes.number.isRequired,
  HP: PropTypes.number.isRequired
};
