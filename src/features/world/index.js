import React from "react";
import { connect } from "react-redux";
import Map from "../map";
import Player from "../player";
import Modal from "../modal";
import map from "../../maps/1";
import { MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import handleMovement from "../movement";

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
        {this.props.modal.visible && <Modal />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(handleMovement(World));
