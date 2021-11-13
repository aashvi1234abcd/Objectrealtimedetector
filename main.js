var status = "";
var video = "";
var objects = [];
var inputofobjects=document.getElementById("itemsputin").value;

function setup() {
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(480,380);
    video.hide();
}

function start() {
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting whatever object you put :P";
}

function modelLoaded() {
    console.log("DECK THE HALLS WITH BOUGHS OF JOLLY BECAUSE THE MODEL IS LOA-o-ADED!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error,results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}


function draw() {
    image(video,0,0,480,380);
    if (status!="") {
        objectDetector.detect(video,gotResults);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status-object detected";
            document.getElementById("numofobjects").innerHTML="We have detected "+objects.length+" objects.";
            fill("#FFC720");
            percentaccuracy=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentaccuracy+"%", objects[i].x,objects[i].y);
            noFill();
            stroke("#FFC720");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

