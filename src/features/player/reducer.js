const initialState = {
  position: [0, 0],
  spriteLocation: "0px 0px",
  direction: "east"
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...state,
        ...action.payload
      };
    case "UPDATE_WALK_INDEX":
      return {
        ...state,
        walkIndex: action.payload
      };

    default:
      return state;
  }
};

export default playerReducer;
