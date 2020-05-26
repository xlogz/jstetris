document.addEventListener('DOMContentLoaded', () => {
    const grid=document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');

    const width=10;

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


    const theTetrominoes = [lTetromino, sTetromino, tTetromino, bTetromino, iTetromino]

    console.log(lTetromino);

    let currentColumn = 4;
    let currentRow = 0;

    let currentBlock = 0;
    let currentRotation = 0
    let current = theTetrominoes[currentBlock][currentRotation];

    function draw(){
        current.forEach(index => {
            squares[currentColumn + index].classList.add('tetromino');
        })
    }

    function clear(){
        current.forEach(index =>{
            squares[currentColumn + index].classList.remove('tetromino');
        })
    }
    
    function moveLeft(){
        if(currentColumn >= 0){
            clear();
            currentColumn--;
            draw();
        }
    }

    function moveRight(){
        if(currentColumn < 10){
            clear();
            currentColumn++;
            draw();
        }
    }

    function rotateBlock(){
        clear();
        if(currentRotation === 3){
            currentRotation = 0;
        }else{
            currentRotation ++;
        }
        current = theTetrominoes[currentBlock][currentRotation];
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
    }

    draw();
})
