import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Combat from "../../features/combat";
import store from "../../config/store";
import { range, sample } from "../../array";
import map from "../../maps/1";
import "./style.css";

function randomEnemy(enemies, levelRange) {
  const _enemy = sample(enemies);
  const level = sample(range(...levelRange));
  return {
    ..._enemy,
    hp: parseInt(_enemy.const + 3 * level),
    level: level
  };
}

// Modal is responsible for combat for now, will most likely use modal for inventory screen and other menus in future
function Modal(props) {
  const [enemy, setEnemy] = useState(randomEnemy(map.enemies, map.levelRange));
  const [message, setMessage] = useState(`A wild ${enemy.name} appears!`);
  let [HP, setHP] = useState([55, 3]);
  let [enemyHP, setEnemyHP] = useState(enemy.hp);

  useEffect(() => {
    window.addEventListener("keydown", handleCombatKeys);
    return () => {
      setEnemy(randomEnemy(map.enemies, map.levelRange));
      window.removeEventListener("keydown", handleCombatKeys);
    };
  }, []);

  function handleHeal() {
    if (HP[1] && HP[0] < 55) {
      setHP([(HP[0] = 55), --HP[1]]);
      setMessage("You used a potion!");
    } else if (HP[0] === 55) {
      setMessage("You already have full health!");
    } else if (!HP[1]) {
      setMessage("You have no more potions!");
    }
  }

  function handleCombat() {
    const enemyAttack = Math.floor(
      Math.random() * (enemy.atk + enemy.level) + enemy.atk
    );
    const dmg = [enemyAttack, Math.floor(Math.random() * (11 - 5) + 5)];
    dmg[1] > enemyHP
      ? setEnemyHP((enemyHP = 0))
      : setEnemyHP((enemyHP = enemyHP - dmg[1]));
    if (enemyHP > 0) {
      dmg[0] > HP[0]
        ? setHP([(HP[0] = 0), HP[1]])
        : setHP([(HP[0] = HP[0] - dmg[0]), HP[1]]);
    }
    if (enemyHP < 1) {
      setMessage(`You dealt ${dmg[0]} and defeated your opponent!`);
      setTimeout(() => {
        store.dispatch({ type: "END_COMBAT" });
      }, 2000);
      // need to create a dispatch for dying, for now only win condition
    } else if (HP[0] < 1) {
      setMessage("You died!");
      setTimeout(() => {
        store.dispatch({ type: "END_COMBAT" });
      }, 2000);
    } else {
      setMessage(
        `You took ${dmg[0]} damage and dealt ${dmg[1]} to your opponent!`
      );
    }
  }

  const handleCombatKeys = e => {
    if (props.visible && HP[0] && enemyHP) {
      e.preventDefault();
      switch (e.keyCode) {
        case 17:
          return handleHeal();
        case 32:
          return handleCombat();
        default:
          console.log(e.keyCode);
      }
    }
  };

  return (
    <div className="modal">
      <h1>COMBAT</h1>
      <Combat enemy={enemy} HP={HP} enemyHP={enemyHP} message={message} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.modal
  };
}

export default connect(mapStateToProps)(Modal);
