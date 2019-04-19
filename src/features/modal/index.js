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
  let [HP, setHP] = useState([50, 3]);
  let [enemyHP, setEnemyHP] = useState(enemy.hp);

  useEffect(() => {
    console.log("mount");
    window.addEventListener("keydown", handleCombatKeys);
    return () => {
      console.log("unmount");
      setEnemy(randomEnemy(map.enemies, map.levelRange));
      window.removeEventListener("keydown", handleCombatKeys);
    };
  }, []);

  function handleHeal() {
    if (HP[1] && HP[0] < 50) {
      setHP([(HP[0] = 50), --HP[1]]);
    }
  }

  function handleCombat() {
    setEnemyHP((enemyHP = enemyHP - Math.floor(Math.random() * (11 - 5) + 5)));
    setHP([(HP[0] = HP[0] - Math.floor(Math.random() * (11 - 5) + 5)), HP[1]]);
    if (HP < 1 || enemyHP < 1) store.dispatch({ type: "END_COMBAT" });
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
      <Combat enemy={enemy} HP={HP} enemyHP={enemyHP} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.modal
  };
}

export default connect(mapStateToProps)(Modal);
