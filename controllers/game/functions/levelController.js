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
	levelData['collisions'] = collisions;
    if(unityLevel == 1 || unityLevel == 3 || unityLevel == 5) {
        levelData['energies'] = unityEnergies;
        levelData['coins'] = 0;
    } else if(unityLevel == 2 || unityLevel == 4 || unityLevel == 6) {
        levelData['energies'] = 0;
        levelData['coins'] = unityCoins;
    }

	//? Inserindo no array global 'gameData' que contém os dados de todas as fases
	gameData.push(levelData);
	
	//! TESTES DE SAÍDA
	console.log(`=== Dados da Fase ${unityLevel} ===`);
	console.log(levelData);
	console.log(gameData);
	console.log(`Dados da fase ${unityLevel} foram coletadas`);
	console.log(userData);
}

function levelDataController(){
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
}

function levelSpritesController(hip, head){
    for(let i=0; i<10; i++) {
        //squaresGroup[i].debug = true;
        squaresGroup[i].height = squaresGroup[i].width = defaultSpriteSize.height*1.1;
    }
    let squaresInterval = (hip.y + hip.y/2) - (head.position.y - 50);
    let headInterval = head.position.y - (head.position.y/2);

    switch(unityLevel){
        case 0:
            //console.log(hipSlider.value);
            levelSizeAndPosition(20, squaresInterval, headInterval, hip, head);
            break;
        case 1:
            levelSizeAndPosition(30, squaresInterval, headInterval, hip, head);
            break;
        case 2:
            levelSizeAndPosition(10, squaresInterval, headInterval, hip, head);
            break;
        case 3:
            levelSizeAndPosition(20, squaresInterval, headInterval, hip, head);
            break;
        case 4:
            levelSizeAndPosition(5, squaresInterval, headInterval, hip, head);
            break;
        case 5:
            levelSizeAndPosition(10, squaresInterval, headInterval, hip, head);
            break; 
    }
}

function levelSizeAndPosition(size, sqInt, hInt, hip, head){
    sqInt = (hip.y + hip.y/2) - (head.position.y - 50);
    hInt = head.position.y - (head.position.y/2);

    for(let i=0; i<10; i++){
                squaresGroup[0].position.y = squaresGroup[5].position.y = hInt;
                squaresGroup[1].position.y = squaresGroup[6].position.y = hInt + (sqInt/9)*1.5;
                squaresGroup[2].position.y = squaresGroup[7].position.y = hInt + (sqInt/9)*2.8;
                squaresGroup[3].position.y = squaresGroup[8].position.y = hInt + (sqInt/9)*5;
                squaresGroup[4].position.y = squaresGroup[9].position.y = hInt + (sqInt/9)*6.5;
                
                if(i<5){
                    if(i === 0) squaresGroup[i].position.x = hip.x + (hip.x/7) - hipSlider.value();
                        else squaresGroup[i].position.x = hip.x - hipSlider.value();
                } else{
                    if(i === 5) squaresGroup[i].position.x = hip.x - (hip.x/7) + hipSlider.value();
                        else squaresGroup[i].position.x = hip.x + hipSlider.value();
                }

                squaresGroup[i].setCollider('circle', 0, 0, size);     
            }
}