var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
}

function draw() {

  noErase();
  noStroke();

  // draw lines converging on the mouse position
  stroke(255);
  strokeWeight(0.2);
  line(mouseX, 0, mouseX, windowHeight);
  line(0, mouseY, windowWidth, mouseY);

  erase();
  noStroke();

  //randomly remove pixels
  for (let i=0; i<600; i++) {
    let x = random(windowWidth);
    let y = random(windowHeight);

    fill(0);
    rect(x,y,1.5,1.5);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}