import { onSnake, expandSnake } from './snake.js';
import {randomGridPosition} from './grid.js'

let food = getRandomFoodPosition()
var expansionRate = 1
var foodStyle = 'food'
export var snakeSpeed = 10
export var foodType = 0 
export var lastFoodtype = 0
var firstRun = true

function getFoodType(){
    if(firstRun === true){
        firstRun = false
    } else {
        lastFoodtype = foodType
    }
    foodType = Math.floor(Math.random() * 3)
}

function getFoodStyle(type){
    var foodStyle = 'food'
    if (type == 1){
        // double growth
        foodStyle = 'foodPower'
    } 
    else if (type == 2){
        // speed up for 10 seconds
        foodStyle = 'foodSpeed'
    } 
    else {
        // regular snake
        foodStyle = 'food'
    }
    return foodStyle
}

function getSnakeSpeed(type){
    var sSpeed = 10
    if (type == 1){
        // double growth
        sSpeed = 10
    } 
    else if (type == 2){
        // speed up
        sSpeed = 25
    } 
    else {
        // regular snake
        sSpeed = 10
    }
    return sSpeed
}

function getSnakeExpansion(type){
    var eRate = 1
    if (type == 1){
        // double growth
        eRate = 2
    } 
    else if (type == 2){
        // speed up for 10 seconds
        eRate = 1
    } 
    else {
        // regular snake
        eRate = 1
    }
    return eRate
}

export function update(){
    if (onSnake(food)){
        getFoodType()
        console.log(foodType)
        foodStyle = getFoodStyle(foodType)
        expansionRate = getSnakeExpansion(foodType)

        expandSnake(expansionRate)
        food = getRandomFoodPosition()
        snakeSpeed = getSnakeSpeed(lastFoodtype)
    }
}

export function draw(gameBoard, type) {2
        var foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add(foodStyle)
        gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}