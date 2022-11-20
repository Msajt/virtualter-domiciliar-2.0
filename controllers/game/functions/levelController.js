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
        squaresGroup[i].debug = mouseIsPressed;
        squaresGroup[i].height = squaresGroup[i].width = defaultSpriteSize.height*1.5;
    }
    let squaresInterval = (hip.y + hip.y/2) - (head.position.y - 50);
    let j=0;
    console.log(squaresInterval);

    switch(unityLevel){
        case 0:
            //squaresGroup[0].position.y = head.position.y;
            for(let i=0; i<10; i++){
                if(i<5){
                    squaresGroup[0].position.y = head.position.y - (head.position.y/2);
                    squaresGroup[1].position.y = head.position.y - (head.position.y/2) + squaresInterval/9;
                    squaresGroup[2].position.y = head.position.y - (head.position.y/2) + (squaresInterval/9)*2.5;
                    squaresGroup[3].position.y = head.position.y - (head.position.y/2) + (squaresInterval/9)*5;
                    squaresGroup[4].position.y = head.position.y - (head.position.y/2) + (squaresInterval/9)*6;
                    
                    squaresGroup[i].position.x = hip.x - 100;
                    //squaresGroup[i].position.y = (head.position.y) + (squaresInterval/5-i);
                    // squaresGroup[1].position.y = head.position.y + (squaresInterval/4);
                    // squaresGroup[2].position.y = head.position.y + (squaresInterval/3);
                    // squaresGroup[3].position.y = head.position.y + (squaresInterval/2);
                    // squaresGroup[4].position.y = head.position.y + (squaresInterval/1);
                    //squaresGroup[i].position.x = hip.x - 150;
                } //else{
                //     squaresGroup[i].position.y = hip.y;
                //     squaresGroup[i].position.x = WIDTH - 40; 
                // }
            }
            // levelSizeAndPosition(80, 20);
            break;
        case 1:
            levelSizeAndPosition(40, 30);
            break;
        case 2:
            levelSizeAndPosition(80, 10);
            break;
        case 3:
            levelSizeAndPosition(40, 20);
            break;
        case 4:
            levelSizeAndPosition(40, 5);
            break;
        case 5:
            levelSizeAndPosition(80, 10);
            break; 
    }
}

function levelSizeAndPosition(pos, size){
    for(let i=0; i<10; i++){
        if(i < 5) squaresGroup[i].position.x = pos;
            else  squaresGroup[i].position.x = WIDTH-pos;
        squaresGroup[i].setCollider('circle', 0, 0, size);
    }
}