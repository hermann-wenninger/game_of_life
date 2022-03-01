let rows = Math.floor(window.innerHeight/5);
let cols = Math.floor(window.innerWidth / 5);

let playing = false;

var grid = new Array(rows);
var nextGrid = new Array(rows);

let timer;
let reproTime = 1;

function initializeGrids(){
    for(let i = 0; i < rows; i++){
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids(){
    for (let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function init(){
    createTable();
    initializeGrids();
    resetGrids();
    setControlButtons();
}

// create table
function createTable(){
let container = document.getElementById('container');
if(!container){
    console.error('problem');
}
let table = document.createElement('table');
for (let i = 0; i < rows; i++){
    let tr = document.createElement('tr');
    for (let j = 0; j < cols; j++){
        let cell = document.createElement('td');
        cell.setAttribute('id', i + '_' + j);
        cell.setAttribute('class','dead');
        cell.onclick = cellClickHandler;
        tr.appendChild(cell);
    }
    table.appendChild(tr);
}

container.appendChild(table);    
}
//add click-handler
function cellClickHandler(){
    let rowcol = this.id.split('_');
    let row = rowcol[0];
    let col = rowcol[1];
    let classes = this.getAttribute('class');
    if(classes.indexOf('live') > -1){
        this.setAttribute('class', 'dead');
        grid[row][col] = 0;
    } else {
        this.setAttribute('class', 'live');
         grid[row][col] = 1;
    }
}

function setControlButtons(){
    let startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;

    let clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;

}
function clearButtonHandler(){
  console.log('clear the game: stop playing'); 
  playing = false;
  let startButton = document.getElementById('start');
  startButton.innerHTML = 'start';
  clearTimeout(timer);
  let cellList = document.getElementsByClassName('live');
  for(let i = 0; i < cellList.length; i++){
      cellList[i].setAttribute('class', 'dead');
  }
  resetGrids();
}
function startButtonHandler(){
    if(playing){
        console.log('pause');
        playing = false;
        this.innerHTML = 'continue';
        clearTimeout(timer);
    } else {
        console.log('continue');
        playing = true;
        this.innerHTML = 'pause';
        play()
    }
}

function play(){
    console.log('play the  game');
    computeNextGen();
    if(playing){
        timer = setTimeout(play, reproTime);
    }
}

function computeNextGen(){
for (let i = 0; i < rows; i++){
    for ( let j = 0; j < cols; j++){
        applyRules(i,j);
    }
}
copyAndResetGrid();
updateView();
}

function applyRules(row, col){
let numNeighbors = countNeighbors(row,col);
if(grid[row][col]==1){
    if(numNeighbors < 2){
        nextGrid[row][col] = 0;
    } else if (numNeighbors == 2 || numNeighbors == 3){
        nextGrid[row][col] = 1;
    } else if (numNeighbors > 3){
        nextGrid[row][col] = 0;
    }
} else if (grid[row][col] == 0) {
    if(numNeighbors ==  3){
        nextGrid[row][col] = 1;
        }
    }
}
function countNeighbors(row, col){
 let count = 0;
 if(row-1 >= 0){
     if(grid[row-1][col] == 1)count++;
 }
 if(row - 1 >= 0 && col-1 >= 0){
     if (grid[row-1][col-1] == 1)count++;
 }
 if(row-1 >=0 && col+1 < cols){
     if(grid[row-1][col+1] == 1) count++;
 }
 if (col-1 >= 0){
     if(grid[row][col-1] == 1) count++;
 }
 if(col+1 <cols){
     if (grid[row][col+1] == 1) count++;
 }
 if(row+1 < rows){
     if(grid[row+1][col] == 1) count++;
 }
 if(row+1 < rows && col-1 >= 0) {
     if (grid[row+1][col-1] == 1) count++;
 }
 if(row+2 < rows && col >= 0){count++}
 return count;
}

function resetGrids(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}
function copyAndResetGrid(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}


function updateView(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++ ){
            let cell = document.getElementById(i + '_' + j);
            if(grid[i][j] == 0){
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'live');
            }
        }
    }
}
//start
window.onload = init;

play();