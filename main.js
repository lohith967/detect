img = "";
status = "";
object = [];


function preload(){

}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video  = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    Objectdetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting" ;
}

function modelLoaded(){
    console.log("Model loaded");
    status = true;
  
}

    
function draw(){
    image(video ,0 ,0 ,380 , 380);
    if(status !=""){ 
        r = random(255);
        g = random(255);
        b = random(255); 

        for( i = 0; i <object.length; i++){

         
            Objectdetector.detect(video,gotresult);
            document.getElementById("status").innerHTML ="Status : Object detected"
            document.getElementById("number_objects").innerHTML = "number of objects detected :"+object.length;
            fill(r,g,b)
            percent = floor(object[i].confidence * 100);
            text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width,object[i].height);
        }
    }
}

function gotresult(error,results){
    if(error){
        console.error(error);
    }

    else{
    console.log(results);
    object = results;
    }
}