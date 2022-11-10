//! Verifica qual moeda foi pega e dá um intervalo entre as colisões
const isTouchingCoins = (square, index, timer, time) => {
    if(index < 5){
        if(unityLevel == undefined || unityLevel == 2 || unityLevel == 4){
            switch(index){
                case 0:
                    gameInstance.SendMessage("Player", "PlayerHandsLH");
                    break;
                case 1:
                    gameInstance.SendMessage("Player", "PlayerHandsLH");
                    break;
                case 2:
                    gameInstance.SendMessage("Player", "PlayerHandsLL");
                    break;
                case 3:
                    gameInstance.SendMessage("Player", "PlayerHandsLL");
                    break;
                default:
                    //console.log('Index inexistente')
            }
        } else{
            switch(index){
                case 0:
                    gameInstance.SendMessage("Player", "PlayerInclinationL1");
                    break;
                case 1:
                    gameInstance.SendMessage("Player", "PlayerInclinationL2");
                    break;
                case 2:
                    gameInstance.SendMessage("Player", "PlayerInclinationL3");
                    break;
                case 3:
                    gameInstance.SendMessage("Player", "PlayerInclinationL4");
                    break;
                case 4:
                    gameInstance.SendMessage("Player", "PlayerInclinationL5");
                    break;
            }
        }
            //gameInstance.SendMessage("Player", "PlayerHandsJS", `L${index+1}`);
        //else gameInstance.SendMessage("Player", "PlayerInclination", `L${index+1}`);
        //console.log(`Testando colisão esquerda: ${index+1}`);
        //gameInstance.SendMessage("Player", "PlayerHandsJS", `L${index+1}`)
    } else {
        if(unityLevel == undefined || unityLevel == 2 || unityLevel == 4){
            switch(index){
                case 5:
                    gameInstance.SendMessage("Player", "PlayerHandsRH");
                    break;
                case 6:
                    gameInstance.SendMessage("Player", "PlayerHandsRH");
                    break;
                case 7:
                    gameInstance.SendMessage("Player", "PlayerHandsRL");
                    break;
                case 8:
                    gameInstance.SendMessage("Player", "PlayerHandsRL");
                    break;
                default:
                    //console.log('Index inválido');
            }
        } else{
            switch(index){
                case 5:
                    gameInstance.SendMessage("Player", "PlayerInclinationR1");
                    break;
                case 6:
                    gameInstance.SendMessage("Player", "PlayerInclinationR2");
                    break;
                case 7:
                    gameInstance.SendMessage("Player", "PlayerInclinationR3");
                    break;
                case 8:
                    gameInstance.SendMessage("Player", "PlayerInclinationR4");
                    break;
                case 9:
                    gameInstance.SendMessage("Player", "PlayerInclinationR5");
                    break;
            }
        }
            //gameInstance.SendMessage("Player", "PlayerHandsJS", `R${(index-5) + 1}`);
        //else gameInstance.SendMessage("Player", "PlayerInclination", `R${(index-5) + 1}`);
        //console.log(`Testando colisão direita: ${(index-5)+1}`);
        //gameInstance.SendMessage("Player", "PlayerHandsJS", `R${(index-5) + 1}`);
    }

	// (index < 5) ?
	// 	// ( console.log(`Testando colisão esquerda: ${index+1}`) ) :
	// 	gameInstance.SendMessage("Player", "PlayerHandsJS", `L${index+1}`) :
	// 	// ( console.log(`Testando colisão direita: ${(index-5)+1}`) );
	// 	gameInstance.SendMessage("Player", "PlayerHandsJS", `R${(index-5) + 1}` )

	timer.coin = square.visible = false;
    collisions++;
	//coinSound.play();
    //    console.log(`Colisões: ${collisions}`);
	resetCoinCollision(square, timer, time);	
}

//! Verifica se houve colisão e invoca a função
const squaresGroupCollision = (squares, timer) => {
    //? Laço pegando todos os quadrados da tela
    squares.forEach((sqr, ind) => {
        //? Verificando a direção [ ind < 5 ? esquerda : direita ]
        (ind < 5) ?
            //? Verificando colisões
            sqr.overlap(leftHand, () => {
                //? Inverte o estado do 'timer' por certo tempo e chama função do
                isTouchingCoins(sqr, ind, timer, 500);
            }) :
            sqr.overlap(rightHand, () => {
                isTouchingCoins(sqr, ind, timer, 500);
            })
    });
}