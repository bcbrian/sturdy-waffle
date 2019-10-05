let movement = 0;

function random(a, b) {
  const randomValue = Math.floor(Math.random() * (b - a) + a);
  return randomValue;
}

function getGameContainer() {
  return document.getElementById("game-container");
}

function moveSturdyWaffle() {
  const sturdyWaffleEl = document.getElementById("sturdy-waffle-container");
  const gameContinerEl = getGameContainer();
  // sturdyWaffleEl.style.left = "0%";
  document.addEventListener("keydown", function(event) {
    requestAnimationFrame(function() {
      const sturdyWaffleBoundingBox = sturdyWaffleEl.getBoundingClientRect();
      const gameContainerBoundingBox = gameContinerEl.getBoundingClientRect();
      if (event.key === "a" && sturdyWaffleBoundingBox.left - 10 > 0) {
        movement = movement - 10;
      }
      if (
        event.key === "d" &&
        sturdyWaffleBoundingBox.left + sturdyWaffleBoundingBox.width + 10 <
          gameContainerBoundingBox.width
      ) {
        movement = movement + 10;
      }
      sturdyWaffleEl.style.left = `calc(50% + ${movement}px`;
    });
  });
}

function generateStackables() {
  const gameContinerEl = getGameContainer();
  const gameContainerBoundingBox = gameContinerEl.getBoundingClientRect();
  const stackableEl = document.createElement("div");
  const width = `${random(20, 200)}px`;
  const bgColor = random(0, 360);

  const leftPercent = Math.ceil(
    (parseInt(width) / gameContainerBoundingBox.width) * 100
  );

  stackableEl.classList.add("stackable");

  stackableEl.style.width = width;
  stackableEl.style.height = random(20, 200);
  stackableEl.style.backgroundColor = `hsl(${bgColor}, 90%, 90%)`;
  stackableEl.style.border = `4px solid hsl(${bgColor}, 90%, 40%)`;
  stackableEl.style.borderRadius = `${random(4, 50)}px`;
  stackableEl.style.position = "absolute";
  stackableEl.style.top = 0;
  stackableEl.style.left = `calc(${random(leftPercent, 100)}% - ${width})`;
  gameContinerEl.append(stackableEl);
}

function getSturdyRange(boundBox, radius) {
  let xLower = 0;
  let xUpper = 0;
  const mid = boundBox.x + boundBox.width / 2;
  const diff = boundBox.width - 2 * radius;

  xLower = mid - diff / 2;
  xUpper = mid + diff / 2;

  return [xLower, xUpper];
}

// Collision check is wrong
function isCollided(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  }
  return false;
}
function isValidCollision(sturdyWaffleBoundingBox, collidedStackables) {
  const swRange = getSturdyRange(sturdyWaffleBoundingBox, 10);
  for (let i = 0; i < collidedStackables.length; i++) {
    const collidedStackable = collidedStackables[i];
    const csRange = getSturdyRange(
      collidedStackable.boundingBox,
      parseInt(collidedStackable.el.style.borderRadius, 10)
    );
    if (
      (csRange[0] > swRange[0] && csRange[1] < swRange[1]) ||
      (csRange[0] < swRange[0] && csRange[1] > swRange[1])
    ) {
      return true;
    }
  }
  return false;
}
function moveStackables(sturdyWaffleBoundingBox, stackableEls, cb) {
  let collisions = [];
  stackableEls.forEach(function(stackableEl) {
    const top = parseInt(stackableEl.style.top, 10);
    stackableEl.style.top = top + 1;
    const stackableElBoundingBox = stackableEl.getBoundingClientRect();
    if (isCollided(sturdyWaffleBoundingBox, stackableElBoundingBox)) {
      collisions.push({
        el: stackableEl,
        boundingBox: stackableElBoundingBox
      });
    }
  });
  if (collisions.length < 1) {
    return cb();
  }
  if (isValidCollision(sturdyWaffleBoundingBox, collisions)) {
    const swcEl = document.getElementById("sturdy-waffle-container");
    swcEl.prepend(collisions[0].el);
    return alert("valid collision");
  }
  alert("collision");
}
function animateStackable() {
  const sturdyWaffleEl = document.getElementById("sturdy-waffle");
  const sturdyWaffleBoundingBox = sturdyWaffleEl.getBoundingClientRect();
  const stackableEls = document.querySelectorAll(".stackable");
  setTimeout(function() {
    moveStackables(sturdyWaffleBoundingBox, stackableEls, animateStackable);
  }, 5);
}

function playGame() {
  moveSturdyWaffle();
  generateStackables();
  animateStackable();
}
playGame();
