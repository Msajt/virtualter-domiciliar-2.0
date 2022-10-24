//! Variáveis constantes
const WIDTH = 480, HEIGHT = 360;
//! Funções do Unity
let gameInstance = UnityLoader.instantiate("gameContainer", "Build/Virtualter - Versão Completa.json", {onProgress: UnityProgress});
//! Inicialização do posenet e da câmera
let video, poseNet, pose, videoIsOn = false;
//! Sprites (quadrados, mãos, ...)
let squaresGroup,
    rightHand, leftHand,
    rightKneeSprite, leftKneeSprite,
    hipSprite;
//! Estado do temporizador de colisão
    //TODO Trocar por um 'object'
//let timerState = true;
//let timerStateStep = true;
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
let unityPoints, unityTime, unityCoins, unityLevel;

function testWalk(){
    gameInstance.SendMessage("Player", "PlayerWalkJS", "walk");
}

function preload(){
    video = createCapture(VIDEO);
}

function setup(){
    //? Definição do canvas na tela
    let canvas = createCanvas(WIDTH, HEIGHT);
    
    //? Criação dos sprites
    squaresGroup = new Group();
        createSquaresGroup();
    rightHand       = createSprite(150, 150, 50, 50);
    leftHand        = createSprite(150, 150, 50, 50);
    rightKneeSprite = createSprite(150, 150, 30, 30);
    leftKneeSprite  = createSprite(150, 150, 30, 30);
    hipSprite       = createSprite(150, 150, 100, 30);
    //leftHipSprite   = createSprite(150, 150, 30, 30);

    //? Botão de recalibrar altura do quadril
    calibrateButton = createButton(`Recalibrar quadril`);
    calibrateButton.position(0, 390);
    calibrateButton.mousePressed(recalibrate);
}

function draw(){
    noSmooth();
    
    //? Verificando se a webcam está ligada
    if(!videoIsOn && gameInstance.progress.full.style.width === '100%') loadWebcam(video, poseNet);
    else if(videoIsOn){
        //? Exibição da webcam
        showVideo(video);
        if(pose){
            let { leftAnkle, rightAnkle,
                  leftEar, rightEar,
                  leftElbow, rightElbow,
                  leftEye, rightEye,
                  leftHip, rightHip,
                  leftKnee, rightKnee,
                  leftShoulder, rightShoulder,
                  leftWrist, rightWrist,
                  nose
                } = pose;

            let hip = {
                x: WIDTH - (leftHip.x+rightHip.x)/2,
                y: (leftHip.y+rightHip.y)/2,
            };
            let neck = {
                x: WIDTH - (leftShoulder.x+rightShoulder.x)/2,
                y: (leftShoulder.y+rightShoulder.y)/2,
            };
            let knees = {
                xR: WIDTH - rightKnee.x,
                yR: Number(rightKnee.y),
                xL: WIDTH - leftKnee.x,
                yL: Number(leftKnee.y),
            };
            
            hipSprite.position.x = hip.x;
            hipSprite.position.y = hip.y + kneeInterval;
                slider.oninput = function(){
                    kneeInterval = sliderValue.innerHTML = Number(this.value);
                }

            hipSprite.width = abs(leftHip.x-rightHip.x)*2;
            hipSprite.height = abs( ( (knees.yL+knees.yR)/2 ) - hip.y) / 4;

            rightKneeSprite.width = leftKneeSprite.width = rightHand.width = leftHand.width = hipSprite.height;
            rightKneeSprite.height = leftKneeSprite.height = rightHand.height = leftHand.height = hipSprite.height;
            
            if(keyWentDown('DOWN_ARROW')) { 
                gameInstance.SendMessage("Player", "PlayerHandsRH");
                console.log('Teste');
            }
            if(keyWentUp('UP_ARROW')) gameInstance.SendMessage("Player", "PlayerInclinationL1");
            if(keyWentUp('RIGHT_ARROW')) gameInstance.SendMessage("Player", "PlayerWalkJS");

            //? Posição das mãos na tela
            handsPosition(rightHand, leftHand);
                //? Verificando se o estado do 'timer' está ativo para colisões
                if(timer.coin) squaresGroupCollision(squaresGroup, timer);

            //? Posição dos joelhos na tela
            kneesPosition(rightKneeSprite, leftKneeSprite);
                //? Verificando se o estado do 'timer' está ativo para colisões
                if(timer.step) kneesCollision(hipSprite, timer);

            //? Angulação do tronco
            chestAngle(neck, hip);
            //? Subida de step
            stepClimb(limitHipY, hip);
            
            //drawSprites(squaresGroup);
            drawSprites();
        }
    }
}

