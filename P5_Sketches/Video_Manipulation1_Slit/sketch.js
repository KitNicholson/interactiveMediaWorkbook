var capture;
let posX;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(640, 480); 
  capture.hide();
  posX = 10;

  blendMode(BLEND);
  fill(10);
}

function draw() {
  image(capture, posX, random(height), 50, 480);
  posX += 1;
  if (posX > width-90) {
    posX = 10;
  }
}
