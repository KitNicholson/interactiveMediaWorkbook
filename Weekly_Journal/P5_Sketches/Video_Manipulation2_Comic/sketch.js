var capture;
let posX;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(640, 480); 
  capture.hide();
  posX = 0;

  blendMode(OVERLAY);
  fill(10);
}

function draw() {

  blendMode(OVERLAY);
  image(capture, width/2 - 320, height/2-280, 640, 480);

  blendMode(BLEND);
  // fill(170, 5);
  fill(200, 5);
  rect(width/2 - 320, height/2-280, 640, 480);

}
