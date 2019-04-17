import { createStore, combineReducers } from "redux";
import playerReducer from "../features/player/reducer";
import mapReducer from "../features/map/reducer";
import modalReducer from "../features/modal/reducer";

const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer,
  modal: modalReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
