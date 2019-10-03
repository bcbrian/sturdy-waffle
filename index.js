let movement = 0;
function moveSturdyWaffle(name) {
  const sturdyWaffleEl = document.getElementById("sturdy-waffle");
  const gameContinerEl = document.getElementById("game-container");
  // sturdyWaffleEl.style.left = "0%";
  document.addEventListener("keydown", function(event) {
    requestAnimationFrame(function() {
      const sturdyWaffleBoundingBox = sturdyWaffleEl.getBoundingClientRect();
      const gameContainerBoundingBox = gameContinerEl.getBoundingClientRect();
      if (event.key === "a" && sturdyWaffleBoundingBox.left - 10 > 0) {
        console.log("move left");
        movement = movement - 10;
      }
      if (
        event.key === "d" &&
        sturdyWaffleBoundingBox.left + sturdyWaffleBoundingBox.width + 10 <
          gameContainerBoundingBox.width
      ) {
        console.log("move right");
        movement = movement + 10;
      }
      sturdyWaffleEl.style.left = `calc(50% + ${movement}px`;
    });
  });
}
moveSturdyWaffle("jerry");
