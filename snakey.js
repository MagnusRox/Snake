const canvas = document.getElementById('canvas');
console.log(canvas);     //getting the canvas 
const cxt = canvas.getContext("2d"); //getting the drawing context, in this case 2D
console.log(cxt);
const unit = 32;

const background = new Image();
background.src = "ground.png";//image for the background
const foodImage = new Image();
//foodImage.onload = function () { console.log('Image is loaded');}
foodImage.src = "food.png"; // image for the food
let snake = [];
snake[0] = {
    x: 9 * unit,
    y: 10 * unit
}; // this is the initial position of the snake. 

let food = {
    x: Math.floor(Math.random() * 17 + 1) * unit,
    /*Math random generates random value b/w 0 & 1. There are 17 units in total
     * So , we multiply it by 17. , adding 1 since the value (Math.random() * 17 )can be lesser than 1 and when applied with floor, reaches 0.
     * Now ,we multiply it by 32 to get the exact position in the canvas. We are applying the same logic to the Y position as well */
    y: Math.floor(Math.random() * 15 + 3) * unit
};
    
//cxt.drawImage(foodImage, food.x, food.y);
let score = 0;
let dir;
document.addEventListener("keydown", direction);
function direction(event) {
    if (event.keyCode == 37 && dir!="RIGHT") { //when the keycode is left arrow and the direction is not right
        dir = "LEFT";
    }
    else if (event.keyCode == 38 && dir != "DOWN") {
        dir = "UP";
    }
    else if (event.keyCode == 39 && dir != "LEFT") {
        dir = "RIGHT";
    }
    else if (event.keyCode == 40 && dir != "UP") {
        dir = "DOWN";
    }
}
function respawnFood() {
    food = {
        x: Math.floor(Math.random() * 17 + 1) * unit,
        y: Math.floor(Math.random() * 15 + 3) * unit
    };
    return food;
}

function checkFoodRespawnPoint(snakeBody) {
    food = respawnFood();
    for (let i = 0; i < snakeBody.length; i++) {
        if (food.x == snakeBody[i].x && food.y == snakeBody[i].y) {
            checkFoodRespawnPoint();
        }
        else {
            continue;
        }
    } return food;
}

function collision(headPos, snakeBody) {
    for (let i = 0; i < snakeBody.length; i++) {
        if (headPos.x == snakeBody[i].x && headPos.y == snakeBody[i].y) {
            return true;
        }
    } return false;
}

function draw() {
    cxt.drawImage(background, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            cxt.fillStyle = "red"; // if the element is the head of the snake , then red
        }
        else {
            cxt.fillStyle = "green"; // if the element is the rest , then green.
        }
        cxt.fillRect(snake[i].x, snake[i].y, unit, unit);
        cxt.strokeStyle = "red";
        cxt.strokeRect(snake[i].x, snake[i].y, unit, unit);
    }
    cxt.drawImage(foodImage, food.x, food.y); //loading the food into the map.
    // this is the score text box
    let snakeX = snake[0].x; // snake head
    let snakeY = snake[0].y;

    if (dir == "LEFT") { snakeX = snakeX - unit; }
    if (dir == "RIGHT") { snakeX = snakeX + unit; }
    if (dir == "UP") { snakeY = snakeY - unit; }
    if (dir == "DOWN") { snakeY = snakeY + unit; }

    /* if the coordinates of the food matches that of the coordinates of the snake, then snake eats food, food respawns
    in another random location*/

    if (food.x == snakeX && food.y == snakeY) {
        score = score + 1;
        food = checkFoodRespawnPoint(snake);
    } else {
        snake.pop(); // tail removed
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    //when the snake touches any of the boundary or hits the snake itself, the game is stopped
    if (snakeX < unit || snakeX > 17 * unit || snakeY < 3 * unit || snakeY > 17 * unit || collision(newHead, snake) || score == 254) { 
         clearInterval(game);
    }

    snake.unshift(newHead);

    cxt.fillStyle = "white";
    cxt.font = "45px Changa one";
    cxt.fillText(score, 2 * unit, 1.6 * unit);
}
let game = setInterval(draw,150); //calls the draw function in 150ms

