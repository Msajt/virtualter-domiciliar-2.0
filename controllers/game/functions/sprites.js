//! Criação do grupo de sprites na tela
const createSquaresGroup = () => {
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
const rightHandPosition = (r) => {
    let { rightWrist } = pose;
	r.position.x = WIDTH - rightWrist.x;
	r.position.y = rightWrist.y;
}

const leftHandPosition = (l) => {
    let { leftWrist } = pose;
	l.position.x = WIDTH - leftWrist.x;
	l.position.y = leftWrist.y;	
}

const handsPosition = (r, l) => {
	rightHandPosition(r);
	leftHandPosition(l);	
}

//! Funções para posição dos joelhos
const rightKneePosition = (r) => {
    let { rightKnee } = pose;
    r.position.x = WIDTH - rightKnee.x
    r.position.y = rightKnee.y
}

const leftKneePosition = (l) => {
    let { leftKnee } = pose;
    l.position.x = WIDTH - leftKnee.x
    l.position.y = leftKnee.y
}

const kneesPosition = (r, l) => {
    rightKneePosition(r);
    leftKneePosition(l);
}