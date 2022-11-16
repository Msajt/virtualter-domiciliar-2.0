//! Criação do grupo de sprites na tela
function createSquaresGroup(){
    for(let i=0; i<10; i++){
        let square;
        (i < 5) ?
            ( square = createSprite(40, 70*(i+1)-20, 50, 50) ) :
            ( square = createSprite(480-40, 70*((i-5)+1)-20, 50, 50) )
        
        //square.addImage('coinImage', coinImage);
        squaresGroup.add(square);
    }
}

//! Funções para a posição das mãos (direita, esquerda e ambas)
function rightHandPosition(r){
    let { rightWrist } = pose;
	r.position.x = WIDTH - rightWrist.x;
	r.position.y = rightWrist.y;
}

function leftHandPosition(l){
    let { leftWrist } = pose;
	l.position.x = WIDTH - leftWrist.x;
	l.position.y = leftWrist.y;	
}

function handsPosition(r, l){
	rightHandPosition(r);
	leftHandPosition(l);	
}

//! Funções para posição dos joelhos
function rightKneePosition(r){
    let { rightKnee } = pose;
    r.position.x = WIDTH - rightKnee.x
    r.position.y = rightKnee.y
}

function leftKneePosition(l){
    let { leftKnee } = pose;
    l.position.x = WIDTH - leftKnee.x
    l.position.y = leftKnee.y
}

function kneesPosition(r, l){
    rightKneePosition(r);
    leftKneePosition(l);
}

//! Criação dos sprites no setup
function spritesSetup(){
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
}

// //! Posição dos sprites do corpo na tela
// function bodySpritesPositionAndSize(pose){
//     let { leftAnkle, rightAnkle,
//           leftEar, rightEar,
//           leftElbow, rightElbow,
//           leftEye, rightEye,
//           leftHip, rightHip,
//           leftKnee, rightKnee,
//           leftShoulder, rightShoulder,
//           leftWrist, rightWrist,
//           nose
//         } = pose;

//     let hip = {
//         x: WIDTH - (leftHip.x+rightHip.x)/2,
//         y: (leftHip.y+rightHip.y)/2,
//     };
//     let neck = {
//         x: WIDTH - (leftShoulder.x+rightShoulder.x)/2,
//         y: (leftShoulder.y+rightShoulder.y)/2,
//     };
//     let knees = {
//         xR: WIDTH - rightKnee.x,
//         yR: Number(rightKnee.y),
//         xL: WIDTH - leftKnee.x,
//         yL: Number(leftKnee.y),
//     };

//     defaultSpriteSize.position.x = WIDTH - (leftEye.x + rightEye.x)/2;
//     defaultSpriteSize.position.y = (leftEye.y + rightEye.y)/2;
//     defaultSpriteSize.height = defaultSpriteSize.width = abs(leftEye.x - rightEye.x + 10);
    
//     hipSprite.position.x = hip.x;
//     hipSprite.position.y = hip.y + kneeInterval;
//         slider.oninput = function(){
//             kneeInterval = sliderValue.innerHTML = Number(this.value);
//         }

//     hipSprite.width = abs(leftHip.x-rightHip.x)*2;
//     hipSprite.height = abs( ( (knees.yL+knees.yR)/2 ) - hip.y) / 4;

//     rightKneeSprite.width = leftKneeSprite.width = rightHand.width = leftHand.width = defaultSpriteSize.height;
//     rightKneeSprite.height = leftKneeSprite.height = rightHand.height = leftHand.height = defaultSpriteSize.height;
// }