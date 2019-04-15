import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../map";
import Player from "../player";
import Combat from "../combat";
import map from "../../maps/1";

import { MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    persistMapData: data => {
      dispatch({ type: "ADD_DATA", payload: data });
    }
  };
}

class World extends React.Component {
  componentDidMount() {
    this.props.persistMapData(map);
  }

  render() {
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
}
export default World;
