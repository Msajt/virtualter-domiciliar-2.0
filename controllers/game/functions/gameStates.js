function MainMenuState(){
    //background(menuBackground);
					
    //? Botões do menu usando o 'mouse'
    SelectButton(button1, 'game-start', 240, 180);
        //button1.addImage(buttonPlay);
    SelectButton(button2, 'instructions', 240, 250);
        //button2.addImage(buttonInstructions);
    
    //? Adicionando os sprites na tela
    drawSprite(button1);
    drawSprite(button2);
}

function InstructionsState(){
    //background(instructionsBackground);
    
    //? Botões do menu usando o 'mouse'
    SelectButton(button1, 'game-start', 420, 325);
        //button1.addImage(buttonPlay);
    
    //? Adicionando os sprites na tela
    drawSprite(button1);
}

function GameStartState(){
    let {   leftAnkle, rightAnkle,
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
    
    // if(keyWentDown('DOWN_ARROW')) { 
    //     gameInstance.SendMessage("Player", "PlayerHandsRH");
    //     console.log('Teste');
    // }
    // if(keyWentUp('UP_ARROW')) gameInstance.SendMessage("Player", "PlayerInclinationL1");
    // if(keyWentUp('RIGHT_ARROW')) gameInstance.SendMessage("Player", "PlayerWalkJS");

    if(keyWentDown('W') || keyWentDown('E')) collisions = 0;

    if(levelComplete.l1 == false && unityLevel == 1){
        ///TODO Pegar energia e pontuação das fases de andar
        console.log("Fase 1 concluida");
        GetLevelData(0);
        levelComplete.l1 = true;
    } 
    else if(levelComplete.l2 == false && unityLevel == 2) {
        console.log("Fase 2 concluida");
        GetLevelData(gameData.reduce((n, {points}) => n + points, 0));
        levelComplete.l2 = true;
    }
    else if(levelComplete.l3 == false && unityLevel == 3) {
        console.log("Fase 3 concluida");
        GetLevelData(gameData.reduce((n, {points}) => n + points, 0));
        levelComplete.l3 = true;
    }
    else if(levelComplete.l4 == false && unityLevel == 4) {
        console.log("Fase 4 concluida");
        GetLevelData(gameData.reduce((n, {points}) => n + points, 0));
        levelComplete.l4 = true;
    }
    else if(levelComplete.l5 == false && unityLevel == 5) {
        console.log("Fase 5 concluida");
        GetLevelData(gameData.reduce((n, {points}) => n + points, 0));
        levelComplete.l5 = true;
    }
    else if(levelComplete.l6 == false && unityLevel == 6 && !isGameFinish) {
        console.log("Fase 6 concluida");
        GetLevelData(gameData.reduce((n, {points}) => n + points, 0));
        levelComplete.l6 = true;
        isGameFinish = true;
    }
    else if(unityLevel == 7){
        //gameData = [];
        let isGameComplete = levelComplete.l1 && levelComplete.l2 && levelComplete.l3 && 
                             levelComplete.l4 && levelComplete.l5 && levelComplete.l6
        if(isGameComplete){
            isGameFinish = false;
            if(!updatingData){
                updatingData = true;
                UpdateUserData(id);
            }
        }
    }

    // if( levelComplete.l1 && levelComplete.l2 && levelComplete.l3 && 
    //     levelComplete.l4 && levelComplete.l5 && levelComplete.l6    ){
    //         //isGameFinish = false;
    //         if(!updatingData){
    //             updatingData = true;
    //             UpdateUserData(id);
    //         }
    // }

    //ResetGame();
    // if(levelComplete.l1 && levelComplete.l2 && levelComplete.l3 && 
    //     levelComplete.l4 && levelComplete.l5 && levelComplete.l6){
    //     ///TODO Jogo completo
    //     ///TODO Update dos dados do usuário
    //     ///TODO Resetar variáveis
    //     levelComplete.l1 = levelComplete.l2 = levelComplete.l3 = levelComplete.l4 = levelComplete.l5 = levelComplete.l6 = false;
    // }

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
    
    drawSprites(squaresGroup);
    drawSprite(rightHand);
    drawSprite(leftHand);
    drawSprite(rightKneeSprite);
    drawSprite(leftKneeSprite);
    drawSprite(defaultSpriteSize);
}

//! CONTROLE DO CANVAS COM O MOUSE
const SelectButton = (button, tag, x, y) => {
	let buttonTag = tag;

	button.position.x = x;
	button.position.y = y;
	button.onMousePressed = () => {
		gameState = buttonTag;
	}
}