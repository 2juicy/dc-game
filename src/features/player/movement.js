export default function handleMovement(player) {
  function handleKeyDown(e) {
    switch (e.keyCode) {
      default:
        console.log(e.keyCode);
    }
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });

  return player;
}
