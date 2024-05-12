// typefaces from MuirMcNeil trial fonts

// Code is an expanded version of work that was never submited for a previous uni subject

var canvas

// misc/functional
let fr = 24;
let maxFR = 24;
let frIncrement = 1;
let fadeOn = false; // set to true to have type fade out
let posNeg = [-1,1];
let edgeOffset = 30;

// colours
let white;
let lightGrey;
let black;

let cyan;
let magenta;
let yellow;

let opacity = 50;

// typography
let sizeText = 50;
let sizeTextIncrement = 5;
let minSizeText = 5;

let minTextSpeed = 30;
let maxTextSpeed = 80;

let twoStrokeA44;
let twoBarMonoThin;
let twoBlockCReg;

let globalFont;
let fonts;

savedText = [];
blendText = []; // text that useses the default blend mode

// ================= Main Functions ================= //

function preload() {
  twoStrokeA44 = loadFont('Data/TwoStrokeA44.otf');
  twoBarMonoThin = loadFont('Data/TwoBar_Mono_016_Thin.otf');
  twoBlockCReg = loadFont('Data/TwoBlock_C_096_Regular.otf');

  fonts = [twoStrokeA44, twoBarMonoThin, twoBlockCReg];
}

function setup() {
  // Set colour variables
  black = color(0);
  white = color(255);
  lightGrey = color(200);

  cyan = color(0,255,255);
  magenta = color(255,0,255);
  yellow = color(255,255,0);

  // Setup Canvas
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', -1);
  background(black);
  blendMode(MULTIPLY);
  
  spawnText();
  randomiseSettings();
}

function draw() {

  if (fadeOn) {
    background(0, 1);
  }

  // update settings
  frameRate(fr);
  //console.log("fr = " + fr);

  // draw and move blend text
  for (let i=0; i<blendText.length; i++) {
    type = blendText[i]

    blendMode(BLEND);
    drawText(type.textStr, type.posX, type.posY, type.colr);
    blendMode(MULTIPLY);
    moveText(type);
  }

  // draw and move saved text
  for (let i=0; i<savedText.length; i++) {
    type = savedText[i]

    drawText(type.textStr, type.posX, type.posY, type.colr);
    moveText(type);
  }
}

// ================= Text Functions ================= // 

function saveText(str, col) {

  savedText.push({
    // saves text string
    textStr: str,

    colr: col,

    // saves initial position
    posX: random(width),
    posY: random(height),

    // sets direction and speed/rate of movement
    directX: random(posNeg),
    directY: random(posNeg),

    // speed in pixels per second
    speedX: random(maxTextSpeed-minTextSpeed) + minTextSpeed,
    speedY: random(maxTextSpeed-minTextSpeed) + minTextSpeed,
  })

  //console.log('array size = ' + savedText.length);
}

function saveToBlendText(str, col) {

  blendText.push({
    // saves text string
    textStr: str,

    colr: col,

    // saves initial position
    posX: random(width),
    posY: random(height),

    // sets direction and speed/rate of movement
    directX: random(posNeg),
    directY: random(posNeg),

    // speed in pixels per second
    speedX: random(maxTextSpeed-minTextSpeed) + minTextSpeed,
    speedY: random(maxTextSpeed-minTextSpeed) + minTextSpeed,
  })

  //console.log("saved " + blendText[0].textStr);
  //console.log('array size = ' + blendText.length);
}

function spawnText() {
  saveText("sense", cyan);
  saveText("synesthesia", magenta);
  saveText("non-sense", yellow);

  saveToBlendText("Interactive", white);
  saveToBlendText("Media", white);

  saveToBlendText("workbook", black);
  // saveToBlendText("Nicholson", black);

}

function randomiseSettings() {
  sizeText = random([30, 250, 500]);
  globalFont = random(fonts);
  fr = random(12, maxFR);
}

function mousePressed() {
  if (blendText.length <= 2 ) {
    spawnText();
  } else if (blendText.length > 2) {
    // remove 3 items from savedText (cyan, magenta, yellow) and three from blendText (white, white, black)
    savedText.shift();
    savedText.shift();
    savedText.shift();
    blendText.shift();
    blendText.shift();
    blendText.shift();
  }
}

function drawText(str, posX, posY, colr) {

  // set colour
  if (colr) {
    fill(colr);
    //noFill();
    //stroke(colr);
    strokeWeight(1);
  }

  // set text style
  textFont(globalFont);
  textAlign(LEFT, CENTER);
  textSize(sizeText);

  // draw text
  text(str, posX, posY);
}

function moveText(type) {
  
  // finds the current edge of the text
  let leftEdge = type.posX;
  let rightEdge = type.posX + textWidth(type.textStr);
  let bottomEdge = type.posY;
  let topEdge = type.posY - textAscent(type.textStr);

  // move on X-axis within screen at rate speed
  if (type.directX > 0 && rightEdge <= width+edgeOffset) {
    // positive direction in bounds
    type.posX += type.speedX * deltaTime * .001;
  } else if(type.directX > 0 && rightEdge > width+edgeOffset) {
    // positive direction out of bounds
    type.directX = -1;
  } else if (type.directX < 0 && leftEdge >= -edgeOffset) {
    // negative direction in bounds
    type.posX -= type.speedX * deltaTime * .001;
  } else if(type.directX < 0 && leftEdge < -edgeOffset) {
    // negative direction out of bounds
    type.directX = +1;
  }

  // move on Y-axis within screen at rate speed
  if (type.directY > 0 && type.posY <= height) {
    // positive direction in bounds
    type.posY += type.speedY * deltaTime * .001;
  } else if(type.directY > 0 && type.posY > height) {
    // positive direction out of bounds
    type.directY = -1;
  } else if (type.directY < 0 && type.posY >= 0) {
    // negative direction in bounds
    type.posY -= type.speedY * deltaTime * .001;
  } else if(type.directY < 0 && type.posY < 0) {
    // negative direction out of bounds
    type.directY = +1;
  }
}

// misc functions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
