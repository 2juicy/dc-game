import React from "react";
import { connect } from "react-redux";
import Map from "../map";
import Player from "../player";
import Combat from "../combat";
import map from "../../maps/1";
import { MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import handleMovement from "../movement";

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    persistMapData: tiles => {
      dispatch({ type: "ADD_TILES", payload: tiles });
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
        className="map"
        style={{
          position: "relative",
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          margin: "20px auto"
        }}
      >
        <Map {...this.props.map} />
        <Player />
        <Combat />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(handleMovement(World));
