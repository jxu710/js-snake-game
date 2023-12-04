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

// the food object will store the x and y coordinates of the food, randomly generated
class Food {
  constructor() {
    this.x = Math.floor(Math.random() * columns) * unit;
    this.y = Math.floor(Math.random() * rows) * unit;
  }

  drawFood() {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  generateNewFood() {
    let overlap = false;
    let newX, newY;

    do {
      newX = Math.floor(Math.random() * columns) * unit;
      newY = Math.floor(Math.random() * rows) * unit;

      inner: for (let i = 0; i < snake.length; i++) {
        if (newX == snake[i].x && newY == snake[i].y) {
          overlap = true;
          break inner;
        } else {
          overlap = false;
        }
      }
    } while (overlap);

    this.x = newX;
    this.y = newY;
  }
}

let food = new Food();

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

// draw the snake
let playGame = setInterval(() => {
  // Clear the canvas before drawing each frame
  ctx.clearRect(0, 0, c.width, c.height);
  console.log(JSON.stringify(snake));

  //   draw the food
  food.drawFood();

  // draw the snake
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
  //   if the snake has hit the wall, then reset the snake position
  if (snakeX >= c.width) {
    snakeX = 0;
  } else if (snakeX < 0) {
    snakeX = c.width - unit;
  } else if (snakeY >= c.height) {
    snakeY = 0;
  } else if (snakeY < 0) {
    snakeY = c.height - unit;
  }

  //   set the new snake head
  let newSnakeHead = {
    x: snakeX,
    y: snakeY,
  };

  // check if the snake has eaten the food
  if (snakeX == food.x && snakeY == food.y) {
    //  generate a new food
    food.generateNewFood();

    snake.unshift(newSnakeHead);
  } else {
    snake.pop();
    snake.unshift(newSnakeHead);

    // make sure that the snake does not overlap/eat itself
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        clearInterval(playGame);
        alert("Game Over");
      }
    }
  }
}, 150);
