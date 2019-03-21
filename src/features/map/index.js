import React from "react";

function MapTile(props) {
  return <div />;
}

function MapRow(props) {
  return props.tiles.map(tile => <MapTile value={tile} />);
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
