const initialState = {
  visible: false
};

const combatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_COMBAT":
      return {
        visible: true,
        ...action.payload
      };
    case "END_COMBAT":
      return {
        visible: false
      };
    default:
      return false;
  }
};

export default combatReducer;
