const loadWebcam = (video, poseNet) => {
    video.size(WIDTH, HEIGHT);
    video.hide();

    poseNet = ml5.poseNet(video,
                          //? 161, 193, 257, 289, 321, 353, 385, 417, 449, 481, 513, and 801
                          { inputResolution: 321 },
                          modelIsReady 
                         );
    poseNet.on('pose', gotPoses);

    videoIsOn = true;
}

const showVideo = (video) => {
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, -1,1);
    pop();
}

const gotPoses = (poses) => {
    if(poses.length > 0) pose = poses[0].pose;
}

const modelIsReady = () => {
    console.log('The PoseNet model is ready');
    recalibrate();
}