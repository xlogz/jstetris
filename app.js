document.addEventListener('DOMContentLoaded', () => {
    const grid=document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let nextSquares = Array.from(document.querySelectorAll('.mini-grid div'));
    console.log(nextSquares);
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');

    const width=10;
    const miniWidth=4;

    const lTetromino = [
        [1, width+1, width*2+1,2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const sTetromino = [
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0,width, width+1, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const bTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]





    const lTetrominoIcon = [
        [1, miniWidth+1, miniWidth*2+1,2],
        [miniWidth, miniWidth+1, miniWidth+2, miniWidth*2+2],
        [1, miniWidth+1, miniWidth*2+1, miniWidth*2],
        [miniWidth, miniWidth*2, miniWidth*2+1, miniWidth*2+2]
    ]

    const sTetrominoIcon = [
        [miniWidth+1, miniWidth+2, miniWidth*2, miniWidth*2+1],
        [0, miniWidth, miniWidth+1, miniWidth*2+1],
        [miniWidth+1, miniWidth+2, miniWidth*2, miniWidth*2+1],
        [0,miniWidth, miniWidth+1, miniWidth*2+1]
    ]

    const tTetrominoIcon = [
        [1, miniWidth, miniWidth+1, miniWidth+2],
        [1, miniWidth+1, miniWidth*2+1, miniWidth+2],
        [miniWidth, miniWidth+1, miniWidth+2, miniWidth*2+1],
        [1, miniWidth, miniWidth+1, miniWidth*2+1]
    ]

    const bTetrominoIcon = [
        [0, 1, miniWidth, miniWidth+1],
        [0, 1, miniWidth, miniWidth+1],
        [0, 1, miniWidth, miniWidth+1],
        [0, 1, miniWidth, miniWidth+1]
    ]

    const iTetrominoIcon = [
        [1, miniWidth+1, miniWidth*2+1, miniWidth*3+1],
        [miniWidth, miniWidth+1, miniWidth+2, miniWidth+3],
        [1, miniWidth+1, miniWidth*2+1, miniWidth*3+1],
        [miniWidth, miniWidth+1, miniWidth+2, miniWidth+3]
    ]





    const theTetrominoes = [lTetromino, sTetromino, tTetromino, bTetromino, iTetromino]
    const iconTetrominoes = [lTetrominoIcon, sTetrominoIcon, tTetrominoIcon, bTetrominoIcon, iTetrominoIcon]

    let currentColumn = 4;
    let currentRow = 0;

    let timerId;

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let nextRandom = Math.floor(Math.random()*theTetrominoes.length);

    let currentBlock = 0;
    let currentRotation = 0
    let current = theTetrominoes[random][currentRotation];
    let next = iconTetrominoes[nextRandom][currentRotation];

    

    function draw(){
        current.forEach(index => {
            squares[currentColumn + index].classList.add('tetromino');
        })
    }

    function drawNext(){
        next.forEach(index => {
            nextSquares[index].classList.add('tetromino');
        })
    }

    function clear(){
        current.forEach(index =>{
            squares[currentColumn + index].classList.remove('tetromino');
        })
    }

    function clearNext(){
        next.forEach(index => {
            nextSquares[index].classList.remove('tetromino');
        })
    }
    
    function moveLeft(){
        clear();
        const isAtLeftEdge = current.some(index=>(currentColumn + index) % width === 0)
        if(!isAtLeftEdge){
            currentColumn-= 1;  
        }

        if(current.some(index => squares[currentColumn + index].classList.contains('taken'))) {
            currentColumn += 1;  
        }
        
        draw();
    }

    function moveRight(){
        clear();
        const isAtRightEdge = current.some(index => (currentColumn + index) % width === width -1)
        if(!isAtRightEdge) currentColumn += 1;

        if(current.some(index=>squares[currentColumn+index].classList.contains('taken'))){
            currentColumn -= 1;
        }
        draw();
    }


    timerId = setInterval(dropPiece, 1000);

    function dropPiece(){
            clear();
            currentColumn = currentColumn + width;
            draw();
            drawNext();
            stopPiece();
    }

    function stopPiece(){
        if(current.some(index => squares[currentColumn + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentColumn + index].classList.add('taken'))
            //start new tetromino
            
            clearNext();
            random = nextRandom;
            current = theTetrominoes[random][currentRotation];

            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            next = iconTetrominoes[nextRandom][currentRotation]

            currentColumn = 4
            draw();
            
            drawNext();
        }
    }


    function rotateBlock(){
        clear();
        if(currentRotation === 3){
            currentRotation = 0;
        }else{
            currentRotation ++;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    document.addEventListener('keypress', detectKeyPress);


    function detectKeyPress(e){
        if(e.code === "KeyW"){
            rotateBlock();
        }

        if(e.code === "KeyA"){
            moveLeft();
        }

        if(e.code === "KeyD"){
            moveRight();
        }

        if(e.code === "KeyS"){
            dropPiece();
        }
    }

    // dropPieceLoop();
    

    draw();
    drawNext();
})
