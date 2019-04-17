const initialState = {
  visible: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_COMBAT":
      return { visible: true };
    case "END_COMBAT":
      return { visible: false };
    default:
      return state;
  }
};

export default modalReducer;
