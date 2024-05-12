let pointsBase = [];
let pointsAlt = [];

let pink = "#FF4dFF";
let red = "#CC0044";
let green = "#84FF4D";
colours = [red, pink, green];

let firstRun = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  if (firstRun) {

    for(let i=0; i<50; i++) {
      var x = random(width);
      var y = random(height);
      pointsBase.push([x,y]);
      pointsAlt.push([x,y]);
    }

    firstRun = false;
  }

  for(let i=0; i<(pointsBase.length); i++) {
    pointsAlt[i][0] = pointsBase[i][0] + ((noise(pointsBase[i][0], mouseX/200)-0.5)*(mouseX-(width/2)));
    pointsAlt[i][1] = pointsBase[i][1] + ((noise(pointsBase[i][0], mouseX/200)-0.5)*(mouseY-(height/2)));
  }

  // draw sketch
  fill(170);
  stroke(0);
  // drawLines(pointsBase);
  
  drawLines(pointsAlt);

  noStroke();

  drawDots(pointsBase);
}

function drawDots(pointArray) {
  // draws the dots on screen
  fill(noise(frameCount/30)*255, noise(frameCount*2/30)*255, noise(frameCount*3/30)*255);
  for(let i=0; i<(pointArray.length); i++) {
    circle(pointArray[i][0], pointArray[i][1], 5);
  }
}

function drawLines(pointArray) {
  // draws the lines on screen
  for(let i=0; i<(pointArray.length-1); i+=2) {
    var p1 = pointArray[i];
    var p2 = pointArray[i+1];
    line(p1[0], p1[1], p2[0], p2[1]);
  }
}


//* 3 colours 
