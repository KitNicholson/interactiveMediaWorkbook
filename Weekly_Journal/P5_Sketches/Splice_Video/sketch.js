var video;
let VideoHistory = [];

var yScan = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  //background(220);
  background(0);
}

function draw() {

  offsetX = width/2 - 640/2;
  offsetY = height/2 - 480/2 - 30;

  //background(220);
  // image(video, 0,0, video.width, video.height);

  spliceVideo();
  //HalfNHalf();
}

function spliceVideo() {
  // call in draw to show live video split the wrong quadrants 

  video.loadPixels();
  copy(video, 0,0,320,240, offsetX+320,offsetY+240,320,240);
  copy(video, 0,240,320,240, offsetX+320,offsetY+0,320,240);
  copy(video, 240,0,320,240, offsetX+0,offsetY+240,320,240);
  copy(video, 320,240,320,240, offsetX+0,offsetY+0,320,240);
}

function HalfNHalf() {
  video.loadPixels();
  copy(video, 0,0,video.width/2,video.height, offsetX+0,offsetY+0,video.width/2,video.height);
  copy(video, video.width/2,0,video.width/2, video.height, offsetX+video.width/2,offsetY+0,video.width/2,video.height);
}