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
let levelComplete = {
    l1 : false,
    l2 : false,
    l3 : false,
    l4 : false,
    l5 : false,
    l6 : false,
}

let collisions = 0;

let gameState = '';

function testWalk(){
    gameInstance.SendMessage("Player", "PlayerWalkJS", "walk");
}

function preload(){
    video = createCapture(VIDEO);

    auth.onAuthStateChanged((user) => {
		if(user) GetUserData(user.uid);
	});
}

function setup(){
    //? Definição do canvas na tela
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.position(75, 175);
    
    //? Criação dos sprites para botões
    button1 = createSprite(0, 0, 100, 50);
	button2 = createSprite(0, 0, 100, 50);

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

function ResetGame(){
    const isGameComplete = levelComplete.l1 && levelComplete.l2 && levelComplete.l3 && 
                           levelComplete.l4 && levelComplete.l5 && levelComplete.l6
	if(isGameComplete){
            levelComplete.l1 = 
            levelComplete.l2 = 
            levelComplete.l3 = 
            levelComplete.l4 = 
            levelComplete.l5 = 
            levelComplete.l6 = 
            false;
		    console.log('Resetando dados para a coleta');
	}
}

//! Coletando os dados de cada fase
function GetLevelData(subtractNumber){
	//? Como se trata de uma variável local dentro da função, o objeto sempre vai resetar
	let levelData = {};

	levelData['points'] = unityPoints - subtractNumber;
	levelData['time'] = unityTime;
	levelData['coins'] = unityCoins;
	levelData['collisions'] = collisions;
	levelData['precision'] = unityCoins/collisions;
    levelData['energies'] = unityEnergies;

	//? Inserindo no array global 'gameData' que contém os dados de todas as fases
	gameData.push(levelData);
	
	//! TESTES DE SAÍDA
	console.log(`=== Dados da Fase ${unityLevel} ===`);
	console.log(levelData);
	console.log(gameData);
	console.log(`Dados da fase ${unityLevel} foram coletadas`);
	console.log(userData);
}

