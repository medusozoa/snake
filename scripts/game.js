import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection} from './snake.js'
import {update as updateFood, snakeSpeed, draw as drawFood, foodType} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
let gameOver = false

function main(currentTime){

    if (gameOver){
        if (confirm('You lost. Press ok to restart.')){
            window.location = '/'
        }
        return 
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 /snakeSpeed) return
    lastRenderTime = currentTime

    update()
    draw()

}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}