var capture;
let posX;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(640, 480); 
  capture.hide();
  posX = 0;

  blendMode(DIFFERENCE);
  fill(10);
  rect(width/2 - 320, height/2-240, 640, 480);
}

function draw() {

  // if (keyIsDown(LEFT_ARROW)) {

  // blendMode(OVERLAY);
  //background(220);
  // image(capture, posX, random(height), 200, 480);
  // image(capture, mouseX, mouseY, 640, 480);
  image(capture, width/2 - 320, height/2-280, 640, 480);
  filter(THRESHOLD);
  posX += 1;
  if (posX > width) {
    posX = 0;
  }

  // blendMode(BLEND);
  // fill(170, 5);
  // fill(200, 5);
  // rect(0,0, width, height);

  // }
}
