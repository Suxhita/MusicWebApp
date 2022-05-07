Scar_song="";
Choose_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_scar = "";
song_choose = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Scar_song = loadSound("music2.mp3");
    Choose_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_scar = Scar_song.isPlaying();
    console.log(song_scar);

    song_choose = Choose_song.isPlaying();
    console.log(song_choose);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Choose_song.stop();
        if(song_scar == false){
            Scar_song.play();
        }
        else{
            console.log("Song Name: Scars To Your Beautiful");
            document.getElementById("song_id").innerHTML = "Song Name: Scars To Your Beautiful";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Scar_song.stop();
        if(song_choose == false){
            Choose_song.play();
        }
        else{
            console.log("Song Name: I Choose");
            document.getElementById("song_id").innerHTML = "Song Name: I Choose";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}