export default function handleMovement(player) {
  function handleKeyDown(e) {
    e.preventDefault();

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
