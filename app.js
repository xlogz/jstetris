document.addEventListener('DOMContentLoaded', () => {
    const grid=document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let nextSquares = Array.from(document.querySelectorAll('.mini-grid div'));
    let scores=0;

    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');


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

    let timerId = null;

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let nextRandom = Math.floor(Math.random()*theTetrominoes.length);

    let currentBlock = 0;
    let currentRotation = 0
    let current = theTetrominoes[random][currentRotation];
    let next = iconTetrominoes[nextRandom][currentRotation];

    scoreDisplay.innerHTML = scores;

    

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


    // timerId = setInterval(dropPiece, 1000);

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
            addScore();
            drawNext();
            gameOver();
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

    function addScore(){
        for(let i = 0; i < 199; i += width){
            const row = [i, i+1,i+2 , i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index=> squares[index].classList.contains('taken'))){
                scores += 10;
                scoreDisplay.innerHTML=scores;
                row.forEach(index=>{
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                })
                const squaresRemoved = squares.splice(i,width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell =>{ grid.appendChild(cell)})
            }
        }
    }

    function gameOver(){
        if(current.some(index => squares[currentColumn + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'end';
            clearInterval(timerId);
        }
    }

    startBtn.addEventListener('click', ()=>{
        if(timerId){
            clearInterval(timerId)
            timerId = null;
        }else{
            draw();
            timerId = setInterval(dropPiece,1000);
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            drawNext();
        }
    })

    // dropPieceLoop();
    

    draw();
    drawNext();
})
