//! Variáveis constantes
const WIDTH = 480, HEIGHT = 360;

//! Funções do Unity
let gameInstance = UnityLoader.instantiate( "gameContainer", 
                                            "Build/Virtualter - Versão Completa.json", 
                                            { onProgress: UnityProgress }
                                          );

//! Inicialização do posenet e da câmera
let video, poseNet, pose, videoIsOn = false;

//! Sprites (quadrados, mãos, ...)
let squaresGroup,
    rightHand, leftHand,
    rightKneeSprite, leftKneeSprite,
    hipSprite;
let defaultSpriteSize;
let button1, button2;

//! Estado do temporizador de colisão
let timer = {
    step: true,
    coin: true,
};

//! Calibração da altura do quadril
let calibrateButton, limitHipY = 0;

//! Slider
let slider = document.getElementById('kneeSlider');
let sliderValue = document.getElementById('sliderValue');
let kneeInterval = Number(slider.value);

//! Variáveis do unity
let unityPoints = 0, unityTime = 0, unityCoins = 0, unityLevel = 0, unityEnergies = 0;

//! Variáveis para 'game controller'
let isGameFinish = false;
let collisions = 0;
let gameState = '';

function preload(){
    video = createCapture(VIDEO);

    auth.onAuthStateChanged(
        (user) => {
		    if(user) GetUserData(user.uid);
            id = user.uid;
	    }   
    );
}

function setup(){
    //? Definição do canvas na tela
    let canvas = createCanvas(WIDTH, HEIGHT);
        canvas.position(75, 175);
    
    spritesSetup();

    //? Botão de recalibrar altura do quadril
    calibrateButton = createButton(`Recalibrar quadril`);
        calibrateButton.position(75, 535);
        calibrateButton.mousePressed(recalibrate);

    //? Iniciar o game state
    gameState = 'main-menu';
}

function draw(){
    noSmooth();
    
    //? Verificando se a webcam está ligada
    if(!videoIsOn && gameInstance.progress.full.style.width === '100%') loadWebcam(video, poseNet);
    else if(videoIsOn){
        //? Exibição da webcam
        showVideo(video);
        if(pose){
            switch(gameState){
                case 'main-menu':
                    MainMenuState();
                    break;
                case 'instructions':
                    InstructionsState();
                    break;
                case 'game-start':
                    GameStartState();
                    break;
            }
        }
    }
}

