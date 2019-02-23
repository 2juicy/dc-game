import React, { Component } from "react";
import Map from "./features/map";
import Player from "./features/player";

class App extends Component {
  render() {
    return (
      <div>
        <Map />
        <Player />
      </div>
    );
  }
}

export default App;
