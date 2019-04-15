import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../map";
import Player from "../player";
import Combat from "../combat";
import map from "../../maps/1";

function mapStateToProps(state){
  
}

class World extends React.Component {
componentDidMount(){
  this.props.persistMapData(map);
}


  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "400px",
        margin: "20px auto"
      }}
    >
      <Map />
      <Player />
    </div>
  );
}

export default World;
