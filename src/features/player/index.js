import React from "react";
import { connect } from "react-redux";
import walkSprite from "./player_walk.png";

function Player(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width: "40px",
        height: "40px"
      }}
    />
  );
}

function mapStateToProps(state) {
  return {
    ...state.player
  };
}

function mapDispatchToProps(dispatch) {
  return {
    move: direction => {
      dispatch({ type: "MOVE_PLAYER", payload: direction });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
