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

    let isFarRight = false;
    let isFarLeft = false;

    let currentColumn = 4;
    let currentRow = 0;

    let random = Math.floor(Math.random()*theTetrominoes.length);

    let currentBlock = 0;
    let currentRotation = 0
    let current = theTetrominoes[random][currentRotation];

    

    function draw(){
        current.forEach(index => {
            squares[currentColumn + index].classList.add('tetromino');
            console.log('filling piece at: ' + (currentColumn + index));
            console.log('checking if far right');
            console.log (currentColumn + index-1);
            console.log((currentColumn +index -1)%9);
            console.log('calculating curentcolumn being in right');
            console.log(((currentColumn + (index-1)) % 9) === 0)
            if(currentColumn + index === 9 ||
              currentColumn + index === 19 ||
              currentColumn + index === 29 ||
              currentColumn + index === 39 ||
              currentColumn + index === 49 ||
              currentColumn + index === 59 ||
              currentColumn + index === 69 ||
              currentColumn + index === 79 ||
              currentColumn + index === 89 ||
              currentColumn + index === 99){
                
              isFarRight = true;
            }
            if((currentColumn + index) === 0 || (currentColumn + index) % 10 === 0){
                isFarLeft = true;
            }
        })
    }

    function clear(){
        current.forEach(index =>{
            squares[currentColumn + index].classList.remove('tetromino');
        })
    }
    
    function moveLeft(){
        isFarRight = false;
            if(isFarLeft){
                console.log('is far left');
            }else{
                clear();
                currentColumn--;
                draw();
            }
            

    }

    function moveRight(){
        isFarLeft = false;

        if(isFarRight){
            console.log('is far right');
        }else{
            clear();
            currentColumn++;
            draw();
        }
            

    }

    function dropPiece(){
            clear();
            currentColumn = currentColumn + 10;
            draw();
    }

    function dropPieceLoop(){
        dropPiece();
        setTimeout(dropPieceLoop, 1000)
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

        if(e.code === "KeyS"){
            dropPiece();
        }
    }

    dropPieceLoop();
    

    draw();
})
