// code modified from ml5.js face mesh example
// https://editor.p5js.org/ml5/sketches/Facemesh_Webcam

let facemesh;
let video;
let predictions = [];

// canvas and image scale
let IScale = 1.3

// typefaces
let amTypeLight;
let amTypeMedItal;

// logic
let loading = true;

showDot = true;

function preload() {
  amTypeLight = loadFont('data/AmericanTypewriterStd_Light.ttf');
  amTypeMedItal = loadFont('data/ITC_American_Typewriter_Std_Medium_Italic.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  // frameRate(3);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  //console.log("Model ready!");
  loading = false;
  frameRate(60);
}

function draw() {
  let offsetX = windowWidth/2 + ((640*IScale)/2);
  let offsetY = windowHeight/2 + (480*IScale/2);
  //translate(offsetX, offsetY);

  background(200);

  line(640*IScale)/2,0,(640*IScale)/2,height;

  if (loading) {
    frameRate(3);
    textFont(amTypeLight);
    textSize(width/6);
    textAlign(CENTER, CENTER);
    text('Loading', width/2 - 20, height*0.60);
    if (showDot) {
      text('             .', width/2 - 20, height*0.65);
    }
    showDot = !showDot;
  } else {
    scale(-1,1);
    translate(-offsetX,0);
    image(video, 0, 0, 640*IScale, 480*IScale);

    fill(200,255);
    noStroke();
    rect(0,0, width, height)
  }

  // We can call both functions to draw all keypoints
  //drawKeypoints();

  // draw the face using the predictive model
  //drawPointNum();

  drawFace();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0, 70);
      noStroke();
      ellipse(x*IScale, y*IScale, 5, 5);
    }
  }
}

function drawPointNum() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      
      // set text styles and number all points
      textAlign(CENTER, CENTER);
      textSize(10);
      fill(255,0,0, 50);

      text(j.toString(), x*IScale, y*IScale);
    }
  }
}

function drawFace() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    fill(i, 1*10, i*5);

    // get face key points (keypoints[j])

    // left eye
    const leftEyeL = keypoints[246];
    //ellipse(leftEyeL[0]*IScale, leftEyeL[1]*IScale, 5, 5);

    const leftEyeR = keypoints[173];
    //ellipse(leftEyeR[0]*IScale, leftEyeR[1]*IScale, 5, 5);

    drawEye(leftEyeL[0]*IScale, leftEyeL[1]*IScale, leftEyeR[0]*IScale, leftEyeR[1]*IScale);

    // left eye brow
    const leftEyeBrowL = keypoints[71];
    // ellipse(leftEyeBrowL[0]*IScale, leftEyeBrowL[1]*IScale, 5, 5);

    const leftEyeBrowR = keypoints[107];
    // ellipse(leftEyeBrowR[0]*IScale, leftEyeBrowR[1]*IScale, 5, 5);

    drawBrowLeft(leftEyeBrowL, leftEyeBrowR);

    // right eye
    const rightEyeL = keypoints[398];
    //ellipse(rightEyeL[0]*IScale, rightEyeL[1]*IScale, 5, 5);

    const rightEyeR = keypoints[466];
    //ellipse(rightEyeR[0]*IScale, rightEyeR[1]*IScale, 5, 5);

    drawEye(rightEyeL[0]*IScale, rightEyeL[1]*IScale, rightEyeR[0]*IScale, rightEyeR[1]*IScale);
    
    // right eye brow
    const rightEyeBrowL = keypoints[336];
    // ellipse(rightEyeBrowL[0]*IScale, rightEyeBrowL[1]*IScale, 5, 5);

    const rightEyeBrowR = keypoints[301];
    // ellipse(rightEyeBrowR[0]*IScale, rightEyeBrowR[1]*IScale, 5, 5);

    drawBrowRight(rightEyeBrowL, rightEyeBrowR);

    //nose
    const noseB = keypoints[1];
    // ellipse(noseB[0]*IScale, noseB[1]*IScale, 5, 5);

    const noseT = keypoints[6];
    // ellipse(noseT[0]*IScale, noseT[1]*IScale, 5, 5);

    drawNose(noseT, noseB);

    // mouth
    const mouthL = keypoints[78];
    //ellipse(mouthL[0]*IScale, mouthL[1]*IScale, 5, 5);

    const mouthR = keypoints[306];
    //ellipse(mouthR[0]*IScale, mouthR[1]*IScale, 5, 5);

    const mouthT = keypoints[13];
    //ellipse(mouthT[0]*IScale, mouthT[1]*IScale, 5, 5);

    const mouthB = keypoints[14];
    //ellipse(mouthB[0]*IScale, mouthB[1]*IScale, 5, 5);

    drawMouth(mouthL, mouthR, mouthT, mouthB);
  }
}

function drawEye(lx, ly, rx, ry) {
  // draws one eye given a left and right point

  // get eye width
  let distx = rx-lx;
  let disty = ry-ly;

  // put eye in position
  push();
  translate(lx + distx/2, ly + disty/2);
  rotate(90);
  
  // draw pupil
  push();
  textSize(distx/1.2);
  textFont(amTypeMedItal);
  text('e',0,0);
  pop();

  // draw eye lids
  textFont(amTypeLight);
  textAlign(CENTER,CENTER);
  textSize(95);
  scale(0.8 * distx/70, 1 * distx/70);
  text('(',-7,-2);
  text(')',8,-5);
  pop();
  
}

function drawBrowLeft(l, r) {

  // get brow width and center measurements
  let distx = r[0]*IScale - l[0]*IScale;
  let disty = r[1]*IScale - l[1]*IScale;

  // draw left brow
  textSize(170);
  push();
  translate(l[0]*IScale + distx/2, l[1]*IScale + disty/2);
  rotate(1.8);
  scale(1*distx/70, 1*distx/70);

  text('~', 0, -15);
  fill(0,255,0);
  // circle(0, 0, 5);
  pop();
}

function drawBrowRight(l, r) {

  // get brow width and center measurements
  let distx = r[0]*IScale - l[0]*IScale;
  let disty = r[1]*IScale - l[1]*IScale;

  // draw right brow
  textSize(170);
  push();
  translate(l[0]*IScale + distx/2, l[1]*IScale + disty/2);
  rotate(1.8);
  scale(1*distx/70, 1*distx/70);

  rotate(-7);
  text('~',0, -15);
  pop();
}

function drawMouth(l, r, t, b) {
  // set typeface
  textFont(amTypeLight);
  textAlign(CENTER, CENTER);

  // get mouth measurments
  let distx = r[0]*IScale - l[0]*IScale;
  let disty = b[1]*IScale - t[1]*IScale;
  
  // draw mouth open smile
  push();
  textSize(108);
  translate(t[0]*IScale, l[1]*IScale);
  rotate(90);
  scale(.8 * distx/70, 1 * distx/70)
  
  if (disty > distx/7) {
    text('D', 0, 0);
  } else {
    text('I', 0, 0);
  }
  drawGoatee(distx);
  pop();
}

function drawNose(t, b) {

  //get distances
  distx = b[0]*IScale - t[0]*IScale;
  disty = b[1]*IScale - t[1]*IScale;

  // draw Nose
  textSize(150);
  push();
  translate(t[0]*IScale + distx/2, t[1]*IScale + disty/2);
  rotate(180);
  scale(.6 *disty/70, .7*disty/70)
  text('7',0,0);

  // circle(0,0,5);

  pop();
}

function drawGoatee(distx) {
  textSize(100);
  push();
  translate(70,0);
  scale(0.55, -0.55);
  rotate(-90);
  text(',', 96, -19);
  text(',',65,-2);
  text(',',45,-2);
  text(',',15,1);
  text(',',-5,1);
  text(',',-35,-2);
  text(',',-57,-2);
  text(',', -88, -18);
  pop();
}