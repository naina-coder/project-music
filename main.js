music1 = "";
music2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

left_WristX = 0;
left_WristY = 0;
right_WristX = 0;
right_WristY = 0;

song1_status = "";
song2_status = "";




function preload()
{
    music1= loadSound("music1.mp3");
    music2 = loadSound("music2.mp3");
}


function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);



}


function modelLoaded()
{
    console.log("PoseNet is Intialized.");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist);
        console.log(scoreRightWrist)
        console.log("RightWristX = " + right_wristX + "RightWristY = " + right_wristY + "leftWristX = " + left_wristX + "LeftWristY  = " + left_wristY);

    }
}

function draw()
{
    image(video,0,0,600,500);

    fill('#ff1900');
    stroke('#ff1900')

    song1_status = music1.isPlaying();
    song2_status = music2.isPlaying();
    
    if(scoreLeftWrist > 0.2)
    {
        circle(left_WristX,left_WristY, 24);
        music2.stop();

        if(song1_status == false)
        {
            music1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme(remix)";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(right_WristX,right_WristY, 24);
        music1.stop();

        if(song2_status == false)
        {
            music2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan(remix)";
        }
    }
    
}

function play()
{
    song.play();
}