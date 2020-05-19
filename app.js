document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10;
    let timerId;


    //�]�w�U�������
    const lPiece = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zPiece = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tPiece = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oPiece = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iPiece = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const pieces = [lPiece, zPiece, tPiece, oPiece, iPiece];


    //��LĲ�o�ƥ�
    function control(e) {
        if (e.keyCode === 39)
            moveRight();
        else if (e.keyCode === 38)
            rotatePiece();
        else if (e.keyCode === 37)
            moveLeft();
        else if (e.keyCode === 40)
            moveDown();
    }
    document.addEventListener('keydown', control);


    //�����H�����
    let random = Math.floor(Math.random() * pieces.length);//�H������0~4
    let currentRotation = 0;
    let currentPiece = pieces[random][currentRotation];


    let currentPosition = 4;
    //ø�s���
    function drawPiece() {
        currentPiece.forEach(index => {
            squares[currentPosition + index].classList.add('piece');

        });
    }

    //�������
    function unDrawPiece() {
        currentPiece.forEach(index => {
            squares[currentPosition + index].classList.remove('piece');

        });
    }

    //timerId = setInterval(moveDown, 500);

    function moveDown() {
        unDrawPiece();
        currentPosition += width;
        drawPiece();
        freezePiece();
    };

    function moveLeft() {
        unDrawPiece();
        const atLeftEdge = currentPiece.some(index => (currentPosition + index) % width === 0);//�I�쥪��� �l�Ʒ|��0

        if (!atLeftEdge) {//�p�G����Ĳ����h��m-1
            currentPosition -= 1;
        }
        if (currentPiece.some(index => squares[currentPosition + index].classList.contains('bottom'))) {//�p�G��Ĳ��w�gfreeze���ϰ�h�A�^����
            currentPosition += 1;
        }
        drawPiece();
    }

    function moveRight() {
        unDrawPiece();
        const atLeftEdge = currentPiece.some(index => (currentPosition + index) % width === width - 1);//�I��k��� �l�Ʒ|��9

        if (!atLeftEdge) {//�p�G����Ĳ����h��m-1
            currentPosition += 1;
        }
        if (currentPiece.some(index => squares[currentPosition + index].classList.contains('bottom'))) {//�p�G��Ĳ��w�gfreeze���ϰ�h�A�^����
            currentPosition -= 1;
        }
        drawPiece();
    }


    function rotatePiece() {
        unDrawPiece();
        currentRotation++;
        if (currentRotation === currentPiece.length) {//�^�_��쥻����
            currentRotation = 0;
        }
        currentPiece = pieces[random][currentRotation];
        drawPiece();
    }

    function freezePiece() {
        if (currentPiece.some(index => squares[currentPosition + index + width].classList.contains('bottom'))) {
            currentPiece.forEach(index => squares[currentPosition + index].classList.add('bottom'));

            //ø�s�@�ӷs�����
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * pieces.length);//�H������0~4
            currentPiece = pieces[random][currentRotation];
            currentPosition = 4;

            drawPiece();
            displayNextPiece();
        }
    }


    //��ܤU�@�Ӥ��
    const displayPieces = document.querySelectorAll('.smallGrid div');
    const displayWidth = 4;
    let displayIndex = 0;
    let nextRandom = 0;

    const nextPiece = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],  // lPiece
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zPiece
        [1, displayWidth, displayWidth + 1, displayWidth + 2],// tPiece
        [0, 1, displayWidth, displayWidth + 1], //oPiece
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iPiece
    ]

    function displayNextPiece() {
        //�M����Ӱ϶��������
        displayPieces.forEach(square => {
            square.classList.remove('piece');
        })
        nextPiece[nextRandom].forEach(index => {
            displayPieces[displayIndex + index].classList.add('piece');
        });
    }


    StartBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            drawPiece();
            timerId = setInterval(moveDown, 500);
            //nextRandom = Math.floor(Math.random() * pieces.length);
            displayNextPiece();
        }

    });

});