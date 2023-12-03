const c = document.querySelector("#myCanvas");
const ctx = c.getContext("2d");

// canvas width is 320px and height is 320px
const unit = 20;
const rows = c.height / unit; // 320/20 = 16
const columns = c.width / unit;

// every element of the snake array will be a object, the job of the object is to store the x and y coordinates of the snake

let snake = [];

snake[0] = {
  x: 4 * unit,
  y: 0,
};
snake[1] = {
  x: 3 * unit,
  y: 0,
};
snake[2] = {
  x: 2 * unit,
  y: 0,
};
snake[3] = {
  x: 1 * unit,
  y: 0,
};

for (item of snake) {
  if (snake.indexOf(item) == 0) {
    ctx.fillStyle = "green";
  } else {
    ctx.fillStyle = "lightgreen";
  }

  //   draw a rectangle of 20px width and height at (x,y) coordinate, with a black border
  ctx.strokeStyle = "black";
  ctx.strokeRect(item.x, item.y, unit, unit);
  ctx.fillRect(item.x, item.y, unit, unit);
}
