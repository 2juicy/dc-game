import React from "react";
import { SPRITE_SIZE } from "../../config/constants";
import "./style.css";

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "floor";
    case 5:
      return "rock";
    case 6:
      return "tree";
  }
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
      }}
    />
  );
}

function MapRow(props) {
  return (
    <div className="row">
      {props.tiles.map(tile => (
        <MapTile tile={tile} />
      ))}
    </div>
  );
}

function Map(props) {
  return (
    <div
      style={{
        width: "808px",
        height: "425px",
        backgroundColor: "silver",
        border: "2.5px solid black"
      }}
    >
      {props.tiles.map(row => (
        <MapRow tiles={row} />
      ))}
    </div>
  );
}

export default Map;
