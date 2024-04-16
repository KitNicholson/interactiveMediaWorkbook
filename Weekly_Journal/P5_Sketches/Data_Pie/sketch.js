let cenX;
let cenY;
let D = 100; //diameter

var storageData = [199,47.49,3.69,1];
var SDColours = [(0,255,0),(240,14),(5),(0,0,255)]

var dataTotal = 0;

let fillValue = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);

  cenX = width/2;
  cenY = height/2;
  posY = cenY - 20;

  if (width>height) {
    D = height*3/5;
  } else {
    D = width *3/5;
  }

  dataTotal = getTotalOf(storageData);
}

function draw() {
  background(220);

  noStroke();

  //draw pie chart
  let lastPiece = 0 - radians(90);
  for (let i=0; i<storageData.length; i++) {

    fill(random(255),random(255),random(255));

    // calculate the angle
    let angle = storageData[i]/dataTotal * 2*PI;

    // draw the current segment
    arc(cenX, posY, D, D, lastPiece, lastPiece+angle);


    // save the current angle for the next segment
    lastPiece += angle;
    // update the colour for the next segment
    fillValue -= 40;
  }

  noLoop();
}

function getTotal() {

  total = 0;

  //get total
  for (let i=0; i<storageData.length; i++) {
    total += storageData[i];
  }

  console.log(total);
}

function getTotalOf(array) {

  let total = 0;

  //get total
  for (let i=0; i<array.length; i++) {
    total += array[i];
  }

  return total;
}
