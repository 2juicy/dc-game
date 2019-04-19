import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Combat from "../../features/combat";
import store from "../../config/store";
import { range, sample } from "../../array";
import map from "../../maps/1";
import "./style.css";

function randomEnemy(enemies, levelRange) {
  const _enemy = sample(enemies);
  return {
    ..._enemy,
    hp: parseInt(_enemy.const * sample(range(...levelRange)))
  };
}

function Modal(props) {
  const [enemy, setEnemy] = useState(randomEnemy(map.enemies, map.levelRange));
  const [message, setMessage] = useState(`A wild ${enemy.name} appears!`);
  let [HP, setHP] = useState([50, 3]);
  let [enemyHP, setEnemyHP] = useState(enemy.hp);

  useEffect(() => {
    window.addEventListener("keydown", handleCombatKeys);
    return () => {
      setEnemy(randomEnemy(map.enemies, map.levelRange));
      window.removeEventListener("keydown", handleCombatKeys);
    };
  }, []);

  function handleHeal() {
    if (HP[1] && HP[0] < 50) {
      setHP([(HP[0] = 50), --HP[1]]);
      setMessage("You used a potion!");
    } else if (HP[0] === 50) {
      setMessage("You already have full health!");
    } else if (!HP[1]) {
      setMessage("You have no more potions!");
    }
  }

  function handleCombat() {
    const dmg = [
      Math.floor(Math.random() * (11 - 5) + 5),
      Math.floor(Math.random() * (11 - 5) + 5)
    ];
    setHP([(HP[0] = HP[0] - dmg[0]), HP[1]]);
    setEnemyHP((enemyHP = enemyHP - dmg[1]));
    if (HP < 1 || enemyHP < 1) {
      setMessage("You have defeated your opponent!");
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
    if (props.visible) {
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
