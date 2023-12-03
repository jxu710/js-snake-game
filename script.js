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

let direction = "right"; // initial direction of the snake
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight" && direction != "left") {
    direction = "right";
  } else if (e.key == "ArrowLeft" && direction != "right") {
    direction = "left";
  } else if (e.key == "ArrowUp" && direction != "down") {
    direction = "up";
  } else if (e.key == "ArrowDown" && direction != "up") {
    direction = "down";
  }
});

let playGame = setInterval(() => {
  // Clear the canvas before drawing each frame

  ctx.clearRect(0, 0, c.width, c.height);
  console.log(JSON.stringify(snake));

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

  //  move the snake, based on the direction of the snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") {
    snakeX += unit;
  } else if (direction == "left") {
    snakeX -= unit;
  } else if (direction == "up") {
    snakeY -= unit;
  } else if (direction == "down") {
    snakeY += unit;
  }

  let newSnakeHead = {
    x: snakeX,
    y: snakeY,
  };

  // check if the snake has eaten the food
  snake.pop();
  snake.unshift(newSnakeHead);
}, 150);

setTimeout(() => clearInterval(playGame), 3500);
