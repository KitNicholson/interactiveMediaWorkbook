var imgCatLooking;
var imgCatSmush;
let igm;

let filterOn = false;

function preload() {
  imgCatLooking = loadImage("data/catLooking.jpg");
  imgCatSmush= loadImage('data/catSmush.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  img = imgCatLooking;
}

function draw() {

  image(img, mouseX, mouseY);

  if (filterOn) {
    imageMode(CENTER);
    filter(THRESHOLD);
  }
}

function mousePressed() {
  if (img === imgCatLooking) {
    img = imgCatSmush;
  } else {
    img = imgCatLooking;
  }
}

function keyPressed() {
  if (key === 'f') {
    filterOn = !filterOn;
  }
}