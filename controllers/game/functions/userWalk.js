const isWalking = (hip, timer, time) => {
        console.log('Passo');
        
        //TODO Colocar a função ' gameInstance.SendMessage() '
            // Coloque aqui a função
        gameInstance.SendMessage("Player", "PlayerWalkJS");

        timer.step = hip.visible = false;
        resetKneeCollision(hip, timer, time);
}

const kneesCollision = (hip, timer) => {
    hip.overlap(rightKneeSprite, () => isWalking(hip, timer, 500));
    hip.overlap(leftKneeSprite , () => isWalking(hip, timer, 500));
}