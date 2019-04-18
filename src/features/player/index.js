import React from "react";
import { connect } from "react-redux";
import walkSprite from "./player_walk.png";
import { SPRITE_SIZE } from "../../config/constants";

function Player(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width: `${SPRITE_SIZE}px`,
        height: `${SPRITE_SIZE}px`
      }}
    />
  );
}

function mapStateToProps(state) {
  return {
    ...state.player
  };
}

export default connect(mapStateToProps)(Player);
