let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let cellX, cellY;
let keyX, keyY;
const FPS = 13;
const CELL_SIZE = 50;
const MAP_WIDTH = 13;
const MAP_HEIGHT = 13;
let hasKey = false;
let winned = false;
let heroLives = true;
let map = [];

let keysDown = {};

addEventListener(
  "keydown",
  function (e) {
    keysDown[e.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function (e) {
    delete keysDown[e.keyCode];
  },
  false
);

let heroReady = false;
let hero = new Image();
hero.onload = function () {
  heroReady = true;
};
hero.src =
  "https://github.com/lostdecade/simple_canvas_game/blob/master/images/hero.png?raw=true";

let spikeReady = false;
let spike = new Image();
spike.onload = function () {
  spikeReady = true;
};
spike.src =
  "https://img.itch.zone/aW1hZ2UvMTM0NDE5Lzk4ODI5OC5wbmc=/347x500/vSU%2B0l.png";

let keyReady = false;
let key = new Image();
key.onload = function () {
  keyReady = true;
};
key.src =
  "https://steamcommunity-a.akamaihd.net/economy/image/zOn6wlo7vsErN7RQqg162gvfyaW760CrYt55UH8xl-sp2U762c4U-CHg3abswAGBfzSsqklJOwF-J_lyhhQTgsUeTboAASU/256fx256f";

let soilReady = false;
let soil = new Image();
soil.onload = function () {
  soilReady = true;
};
soil.src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1QB8d1gVpp1s4WPjvGtyxMneCKAEIcNGEupqRov9OacTDhBVmOg";

let stoneReady = false;
let stone = new Image();
stone.onload = function () {
  stoneReady = true;
};
stone.src = "";

let exitReady = false;
let exit = new Image();
exit.onload = function () {
  exitReady = true;
};
exit.src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgiN_K8fAH2-GqmXay4YT8z1GT_vOSirCsPhKSGu3WKmbYwFKxA";

init();
setInterval(function () {
  render();
  update();
}, 1000 / FPS);

function init() {
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 3, 0, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 3, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 3, 1, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  ];
  cellX = 4;
  cellY = 1;
  keyX = 11;
  keyY = 1;
  hasKey = false;
  winned = false;
  heroLives = true;
  ctx.fillStyle = "#D50000";
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      switch (getCell(x, y)) {
        case 0:
          if (soilReady) {
            ctx.drawImage(
              soil,
              x * CELL_SIZE,
              y * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
          }
          break;
        case 1:
          if (stoneReady) {
            ctx.drawImage(
              stone,
              x * CELL_SIZE,
              y * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
          }
          break;
        case 2:
          if (exitReady) {
            ctx.drawImage(
              exit,
              x * CELL_SIZE,
              y * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
          }
          break;
        case 3:
          if (spikeReady) {
            ctx.drawImage(
              soil,
              x * CELL_SIZE,
              y * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
            ctx.drawImage(
              spike,
              x * CELL_SIZE,
              y * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
          }
      }
    }
  }
  if (heroReady && heroLives) {
    ctx.drawImage(
      hero,
      cellX * CELL_SIZE,
      cellY * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
  if (keyReady && !hasKey) {
    ctx.drawImage(
      key,
      keyX * CELL_SIZE,
      keyY * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
  if (hasKey) {
    ctx.fillStyle = "#00C853";
  }
  ctx.fillRect(canvas.width / 2 - 20, 0, 40, 40);
}

function update() {
  if (getCell(cellX, cellY) == 2 && winned == false && hasKey) {
    winned = true;
    document.getElementById("info").style.color = "#00C853";
    document.getElementById("info").innerHTML = "You win :)";
  }
  if (getCell(cellX, cellY) == 3) {
    heroLives = false;
    document.getElementById("info").style.color = "#D50000";
    document.getElementById("info").innerHTML =
      'You dead. Press "r" to restart';
  }
  if (38 in keysDown) {
    if (getCell(cellX, cellY - 1) != 1) {
      cellY--;
    }
  }

  if (40 in keysDown) {
    if (getCell(cellX, cellY + 1) != 1) {
      cellY++;
    }
  }

  if (39 in keysDown) {
    if (getCell(cellX + 1, cellY) != 1) {
      cellX++;
    }
  }

  if (37 in keysDown) {
    if (getCell(cellX - 1, cellY) != 1) {
      cellX--;
    }
  }

  if (82 in keysDown) {
    init();
  }

  if (cellX == keyX && cellY == keyY) {
    hasKey = true;
  }
}

function getCell(x, y) {
  if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
    return map[y][x];
  }
}
