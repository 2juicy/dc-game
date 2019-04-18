import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Combat from "../../features/combat";
import store from "../../config/store";
import { range, sample } from "../../array";
import map from "../../maps/1";
import "./style.css";

function randomEnemy(enemies, levelRange) {
  const data = sample(enemies);
  return {
    ...data,
    hp: parseInt(data.const * sample(range(...levelRange)))
  };
}

function Modal(props) {
  let [HP, setHP] = useState(100);
  let [potion, setPotion] = useState(3);
  const [enemy, setEnemy] = useState(randomEnemy(map.enemies, map.levelRange));
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
    if (potion && HP < 100) {
      setPotion(--potion);
      setHP((HP = 100));
    }
  }

  function handleCombat() {
    setEnemyHP((enemyHP = enemyHP - Math.floor(Math.random() * (11 - 5) + 5)));
    setHP((HP = HP - Math.floor(Math.random() * (11 - 5) + 5)));
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
      <Combat enemy={enemy} HP={HP} enemyHP={enemyHP} potion={potion} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.modal
  };
}

export default connect(mapStateToProps)(Modal);
