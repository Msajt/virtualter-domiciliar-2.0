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
let defaultSpriteSize;
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
let unityPoints, unityTime, unityCoins, unityLevel, unityEnergies;

//! Variáveis para 'game controller'
let levelComplete = {
    l1 : false,
    l2 : false,
    l3 : false,
    l4 : false,
    l5 : false,
    l6 : false,
}
let collisions = 0;

function testWalk(){
    gameInstance.SendMessage("Player", "PlayerWalkJS", "walk");
}

function preload(){
    video = createCapture(VIDEO);
}

function setup(){
    //? Definição do canvas na tela
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.position(75, 175);
    
    //? Criação dos sprites
    squaresGroup = new Group();
        createSquaresGroup();
    rightHand       = createSprite(150, 150, 50, 50);
    leftHand        = createSprite(150, 150, 50, 50);
    rightKneeSprite = createSprite(150, 150, 30, 30);
    leftKneeSprite  = createSprite(150, 150, 30, 30);
    hipSprite       = createSprite(150, 150, 100, 30);
    //leftHipSprite   = createSprite(150, 150, 30, 30);
    defaultSpriteSize = createSprite(150, 150, 30, 30);

    //? Botão de recalibrar altura do quadril
    calibrateButton = createButton(`Recalibrar quadril`);
    calibrateButton.position(75, 535);
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

            defaultSpriteSize.position.x = WIDTH - (leftEye.x + rightEye.x)/2;
            defaultSpriteSize.position.y = (leftEye.y + rightEye.y)/2;
            defaultSpriteSize.height = defaultSpriteSize.width = abs(leftEye.x - rightEye.x + 10);
            
            hipSprite.position.x = hip.x;
            hipSprite.position.y = hip.y + kneeInterval;
                slider.oninput = function(){
                    kneeInterval = sliderValue.innerHTML = Number(this.value);
                }

            hipSprite.width = abs(leftHip.x-rightHip.x)*2;
            hipSprite.height = abs( ( (knees.yL+knees.yR)/2 ) - hip.y) / 4;

            rightKneeSprite.width = leftKneeSprite.width = rightHand.width = leftHand.width = defaultSpriteSize.height;
            rightKneeSprite.height = leftKneeSprite.height = rightHand.height = leftHand.height = defaultSpriteSize.height;
            
            if(keyWentDown('DOWN_ARROW')) { 
                gameInstance.SendMessage("Player", "PlayerHandsRH");
                console.log('Teste');
            }
            if(keyWentUp('UP_ARROW')) gameInstance.SendMessage("Player", "PlayerInclinationL1");
            if(keyWentUp('RIGHT_ARROW')) gameInstance.SendMessage("Player", "PlayerWalkJS");
            if(keyWentDown('W') || keyWentDown('E')) collisions = 0;

            /// =============
            /// = T E S T E =
            /// =============

            if(levelComplete.l1 == false && unityLevel == 1){
                ///TODO Pegar energia e pontuação das fases de andar
                console.log("Fase 1 concluida");
                levelComplete.l1 = true;
            } 
            else if(levelComplete.l2 == false && unityLevel == 2) {
                console.log("Fase 2 concluida");
                levelComplete.l2 = true;
            }
            else if(levelComplete.l3 == false && unityLevel == 3) {
                console.log("Fase 3 concluida");
                levelComplete.l3 = true;
            }
            else if(levelComplete.l4 == false && unityLevel == 4) {
                console.log("Fase 4 concluida");
                levelComplete.l4 = true;
            }
            else if(levelComplete.l5 == false && unityLevel == 5) {
                console.log("Fase 5 concluida");
                levelComplete.l5 = true;
            }
            else if(levelComplete.l6 == false && unityLevel == 6) {
                console.log("Fase 6 concluida");
                levelComplete.l6 = true;
            }

            if(levelComplete.l1 && levelComplete.l2 && levelComplete.l3 && 
               levelComplete.l4 && levelComplete.l5 && levelComplete.l6){
                ///TODO Jogo completo
                ///TODO Update dos dados do usuário
                ///TODO Resetar variáveis
            }

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

