import store from "../../config/store";
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from "../../config/constants";

function randomCombat() {
  const random = Math.floor(Math.random() * 10 + 1);
  console.log(random);
  if (random === 10)
    store.dispatch({
      type: "START_COMBAT",
      payload: {
        type: "COMBAT"
      }
    });
}

function observeImpassable(newPos) {
  const { tiles } = store.getState().map;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;
  const nextTile = tiles[y][x];
  return nextTile < 5;
}

function observeBoundaries(newPos) {
  return (
    newPos[0] >= 0 &&
    newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
    newPos[1] >= 0 &&
    newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
  );
}

function attemptMove(oldPos, newPos) {
  let inBoundary = observeBoundaries(newPos);
  if (inBoundary) inBoundary = observeImpassable(newPos);
  if (inBoundary) animateWalk();
  randomCombat();
  return inBoundary ? newPos : oldPos;
}

function getNewPosition(oldPos, direction) {
  switch (direction) {
    case "WEST":
      return attemptMove(oldPos, [oldPos[0] - SPRITE_SIZE, oldPos[1]]);
    case "EAST":
      return attemptMove(oldPos, [oldPos[0] + SPRITE_SIZE, oldPos[1]]);
    case "NORTH":
      return attemptMove(oldPos, [oldPos[0], oldPos[1] - SPRITE_SIZE]);
    case "SOUTH":
      return attemptMove(oldPos, [oldPos[0], oldPos[1] + SPRITE_SIZE]);
    default:
      return [oldPos[0], oldPos[1]];
  }
}

function getSpriteLocation(direction) {
  const index = store.getState().player.walkIndex;
  switch (direction) {
    case "SOUTH":
      return `${SPRITE_SIZE * index}px ${SPRITE_SIZE * 0}px`;
    case "EAST":
      return `${SPRITE_SIZE * index}px ${SPRITE_SIZE * 1}px`;
    case "WEST":
      return `${SPRITE_SIZE * index}px ${SPRITE_SIZE * 2}px`;
    case "NORTH":
      return `${SPRITE_SIZE * index}px ${SPRITE_SIZE * 3}px`;
    default:
  }
}

function dispatchMove(e, direction) {
  const state = store.getState();
  store.dispatch({
    type: "MOVE_PLAYER",
    payload: {
      position: getNewPosition(state.player.position, direction),
      direction,
      spriteLocation: getSpriteLocation(direction)
    }
  });
  e.preventDefault();
}

function handleKeyDown(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 37:
      return dispatchMove(e, "WEST");
    case 38:
      return dispatchMove(e, "NORTH");
    case 39:
      return dispatchMove(e, "EAST");
    case 40:
      return dispatchMove(e, "SOUTH");
    default:
      console.log(e.keyCode);
  }
}

function getWalkIndex() {
  const index = store.getState().player.walkIndex;
  return index >= 7 ? 0 : index + 1;
}

function animateWalk() {
  store.dispatch({ type: "UPDATE_WALK_INDEX", payload: getWalkIndex() });
}

export default function handleMovement(component) {
  window.addEventListener("keydown", e => {
    if (!store.getState().combat.visible) handleKeyDown(e);
  });
  return component;
}
