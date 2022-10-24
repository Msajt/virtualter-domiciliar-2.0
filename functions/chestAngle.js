const chestAngle = (neck, hip) => {
    //? Definindo uma linha entre pescoço e quadril
    line(neck.x, neck.y, hip.x, hip.y);
        stroke('black');
        ellipse(neck.x, neck.y, 10);
        ellipse(hip.x, hip.y, 10);

    //? Definindo angulação entre pescoço e quadril
    let v1, v2, angle;
    v1 = createVector(50, 0);
    v2 = createVector(neck.x-hip.x, neck.y-hip.y);

        angle = -degrees(v1.angleBetween(v2)).toFixed(2);
        
    //? Exibindo texto na tela
    let angleText;
    textSize(15);
    if(angle > 90) angleText = `${(angle - 90).toFixed(2)}° esquerda`;
        else       angleText = `${((angle - 90)*-1).toFixed(2)}° direita`;
        text(`Angulação do tronco: ${angleText}`, 220, 20);
}