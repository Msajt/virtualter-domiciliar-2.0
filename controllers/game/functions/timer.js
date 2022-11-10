//TODO Tentar unificar as funções

//! Exibe a moeda novamente no canvas
const resetCoinCollision = (square, timer, time) => {
	setTimeout(() => {
		timer.coin = square.visible = true;
	}, time);
}

//! Exibe o sprite de colisão do passo
const resetKneeCollision = (hip, timer, time) => {
    setTimeout(() => {
        timer.step = hip.visible = true;
    }, time);
}