function MainMenuState(){
    //? Background
    background(menuBackground);
					
    //? Botões do menu usando o 'mouse'
    SelectButton(button1, 'game-start', 240, 180);
        button1.addImage(buttonPlay);
    SelectButton(button2, 'instructions', 240, 250);
        button2.addImage(buttonInstructions);
    
    //? Adicionando os sprites na tela
    drawSprite(button1);
    drawSprite(button2);
}

function InstructionsState(){
    button2.remove();

    //? Background
    background(instructionsBackground);
    
    //? Botões do menu usando o 'mouse'
    SelectButton(button1, 'game-start', 420, 325);
        button1.addImage(buttonPlay);
    
    //? Adicionando os sprites na tela
    drawSprite(button1);
}

function GameStartState(){
    button2.remove();

    //? Posição dos sprites do corpo na tela
    //bodySpritesPositionAndSize(pose);
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

    //? Level controller
    levelDataController();
    levelSpritesController();

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
    drawSprite(hipSprite);
    drawSprite(rightKneeSprite);
    drawSprite(leftKneeSprite);
    //drawSprite(defaultSpriteSize);
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