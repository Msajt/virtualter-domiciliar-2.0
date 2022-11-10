const stepClimb = (limit ,hip) => {
    line(0, limit, width, limit);
    ellipse(hip.x, hip.y, 15);

    if(limit > hip.y){
        text(`Usuário subiu o step`, 220, 40);
        gameInstance.SendMessage("Player", "PlayerStepJS", "stepup");
    } else{
        text(`Usuário desceu o step`, 220, 40);
        gameInstance.SendMessage("Player", "PlayerStepJS", "stepdown");
    }
}

const recalibrate = () => {
    setTimeout(() => {
        let { leftHip, rightHip } = pose;
        limitHipY = (leftHip.y + rightHip.y)/2 - 30;
    }, 3000);
}