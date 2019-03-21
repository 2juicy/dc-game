import React from "react";

function MapTile(props) {
  return <div />;
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
      {props.tiles.map(tile => (
        <MapTile value={tile} />
      ))}
    </div>
  );
}

export default Map;
