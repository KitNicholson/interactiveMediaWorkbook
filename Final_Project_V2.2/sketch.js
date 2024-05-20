// swipe controls modified from code by 'p5.js web editor' user 'shiffman'
// source https://editor.p5js.org/shiffman/sketches/HyEDRsPel
// lines 63-76 and 310-323

// also uses modified code from the following link to handle taps
// https://stackoverflow.com/questions/22535088/hammer-js-how-to-handle-set-tap-and-doubletap-on-same-elements


// =========== KNOWN BUGS =========== //

/*
* If there are too many audio tracks, that run for too long, it dies. 
* at least that is what I think the problem is
*/

/*
* If the bar length is reduced to less than an recordings tirger beat,
* that recording will not play untill after it is randomly selected 
* for the trigger beat to be shifted
*/

/*
* not a 'bug' but is a problem,
* the recording device and pick a feed back from the audio output
*/

// =========== Global Variables =========== //

// Time Variables

barLength = 4; // number of beats in a bar
bpm = 80; // num beats per minute
beatDuration = 0; // how long each beat lasts in seconds 
beat = false; // boolean to describe if the current frame will count as a 'beat'

beatCount = 0; // how many beats have passed
beatTimer = 0; // time left until next beat

// Recording variables

let mic, recorder;
let recording = false;
let toggelRec;

let recordings = []; // array to hold multiple sound files
let recDelay = []; // for each recording store the delay after the last beat
let recTriggered = []; // true if the sound file has been trigered this bar, else false (resets on beat 1)
let recTrigBeat = []; // the beat on which the sound file will trigger

// control variables

let shiftOn = true;

// =========== Setup Function =========== //

function setup() {
  //setup canvas
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  // get beat duration from bpm
  SetBeatLength();

  // set up audio recording
  setupAudio();

  background(200);

  // start of code modified from 'shiffman'
  // set options to prevent default behaviors for swipe, pinch, etc
  var options = {
    preventDefault: true
  };

  console.log('here');

  // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });

  var singleTap = new Hammer.Tap({ event: "tap" });
  hammer.add(singleTap);

  hammer.on("tap", tapped);
  hammer.on("swipe", swiped);
  // end of code by 'shiffman'

}

function setupAudio() {
  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // give an initial sound file to record into
  recordings[0] = new p5.SoundFile();
}

// =========== Main Function =========== //

function draw() {

  // fade background to black so each beat is noticeable
  background(40, 5);

  // update beat timer
  beatCountdown();

  // on Every Beat
  if (beat) {
    background(0,0,140);
    DisplayBeats();
    resetRecTriggered();
  }

  // on the first beat, do the following
  if (beat && beatCount === 1) {
    background(0,100,0);
    DisplayBeats();
  } 

  // on the last beat, do the following
  if (beat && beatCount === 1) {
    if (recordings.length > 1 && shiftOn) {
      shiftTrigBeat();
    }
  } 

  // play each soundfile in recordings, with the aprorpiet dealy

  for (let i=0; i<recordings.length - 1; i++) {
    // for each soundfile

    if (beatTimer < recDelay[i] && !recTriggered[i] && recTrigBeat[i] === beatCount) {
      // if delay hass passed and not already triggered

      recordings[i].play();
      recTriggered[i] = true;

    }
  }

  // if recording let the user know
  if (recording) {
    fill(255,0,0);
    circle(50,50,30);
  }

  // show current bpm and bar length
  fill(255);
  textAlign(LEFT);
  textSize(20);
  text('bpm = ' + bpm, width - 100, 20);
  text('bar length = ' + barLength, width - 150, 40);

}

// =========== Time/Beat Functions =========== //

function beatCountdown() {
  /* updates the timer until the next beat,
  * if the timer is < 0 than it resets the timer */

  // count beats
  if (beatTimer > 0) {
    beatTimer -= deltaTime/1000;
    beat = false;
  } else {
    beatTimer = beatDuration;
    beatCount++;
    beat = true;
  }

  // once there have been enough beats, end the bar
  if (beatCount > barLength) {
    // set beat count to 1 not 0, as beat 1 is the start of the next bar
    beatCount = 1;
  }
}

function SetBeatLength() {
  // makes beatTimer match the current bpm
  beatDuration = 60/bpm;
  //console.log(beatDuration);
}

function DisplayBeats() {
  // displays the current beat count on screen

  // set text styles
  textAlign(CENTER, CENTER);
  textSize(130);

  fill(255);
  text('' + beatCount, width/2, height/2);
}

function resetRecTriggered() {
  for (let i=0; i<recTriggered.length; i++) {
    recTriggered[i] = false;
  }
}

function shiftTrigBeat() {

  // select one random track to shift trig beat
  {
    let r = int(random(recordings.length - 1))
    console.log('shift the trig beat for track ' + r);
    console.log('from ' + recTrigBeat[r]);
    recTrigBeat[r] = incrimentTrigBeat(recTrigBeat[r]);
    console.log('to ' + recTrigBeat[r]);
  }

  // Change trig beat for all tracks
  // {
  //   for (let i=0; i<recordings.length - 1; i++) {
  //     // for each soundfile

  //     // randomise the chance of incrimenting the trigger beat.
  //     // currently will always happen for testing purposes
  //     if (random(recordings.length) < 1) {
  //       console.log('shift the trig beat for track ' + i);
  //       console.log('from ' + recTrigBeat[i]);
  //       recTrigBeat[i] = incrimentTrigBeat(recTrigBeat[i]);
  //       console.log('to ' + recTrigBeat[i]);
  //     }
  //   }
  // }
}

function incrimentTrigBeat(beat) {
  // shift a given beat by one unless, and return that value

  beat++;

  if (beat > barLength) {
    beat = 1;
  }

  return beat
}

// =========== Recording Functions =========== //

function emptyRecordings() {
  // removes all sound files from recordings array 

  // remove the recordings
  recordings.length = 0;

  // add a new soundfile to the array
  recordings[recordings.length] = new p5.SoundFile();

  // let the user know what has happened
  // background(220);
  // text('Recordings Removed', width/2, height/2);
}

function recordAudio() {
  /* records user input
  * call once to start recording
  * call again to stop recording */

   // make sure user enabled the mic
   if (!recording && mic.enabled) {

    // record to last sounfile in recordings array
    recorder.record(recordings[recordings.length - 1]);
    // save delay time (time after beat), minus actuall system delay as a plus because we want the sound to play earlier on the count down.
    recDelay[recordings.length - 1] = beatTimer + 0.1;
    // add recTrigger value
    recTriggered[recordings.length - 1] = false;
    // set the soundfile to play/trigger on the last beat by default !!will not be the last beat if the bar length changes
    recTrigBeat[recordings.length - 1] = beatCount;

    console.log('track count = ' + recordings.length)
    //console.log('recording start');
    //console.log(recDelay[recordings.length - 1]);

    // let the system know recording is running
    recording = true;

    // let the user know what has happened
    // background(255,0,0);
    // text('Recording!', width/2, height/2);
  }
  else if (recording) {

    // stop recorder and send result to soundFile
    recorder.stop();
    //console.log('recording stop')


    // add a new soundfile to the array
    recordings[recordings.length] = new p5.SoundFile();

    // let the systen know the recording has finished
    recording = false;

    // let the user know what has happened
    // text('Done!', width/2, height/2);
    
  }
}

function playAudio() {

  // when not recording
  if (!recording) {

    // play all recorded files
    // recordings.length - 1 because the last element is not yet ready to play
    for (let i=0; i<recordings.length - 1; i++) {
      recordings[i].play();
    }
  }

}

// =========== Control Functions =========== //

// this function is modified from 'schiffman's code
function swiped(event) {
  console.log(event);
  if (event.direction == 4) {
    // when swiped right
    
    barLength++;
    console.log('Beat added to bar')

  } else if (event.direction == 8) {
    // when swiped up

    bpm++;
    SetBeatLength();

    console.log('FASTER');
    console.log(bpm);

  } else if (event.direction == 16) {
    // when swiped down

    bpm--;
    SetBeatLength();

    console.log('SLOWER');
    console.log(bpm);

  } else if (event.direction == 2) {
    // when swiped left

    barLength--;
    console.log('Beat removed from bar')

  }
}
// end of code by 'shiffman'

function tapped(event) {
  console.log('tapped');
  recordAudio();
}

function keyPressed() {

  // beat/bar controlls
  if (keyCode === UP_ARROW) {
    bpm++;
    SetBeatLength();

    console.log('FASTER');
    console.log(bpm);

  } else if (keyCode === DOWN_ARROW && bpm > 2) {
    bpm--;
    SetBeatLength();

    console.log('SLOWER');
    console.log(bpm);

  } else if (keyCode === RIGHT_ARROW) {
    barLength++;
    console.log('Beat added to bar')

  } else if (keyCode === LEFT_ARROW && barLength > 1) {
    barLength--;
    console.log('Beat removed from bar')
  }

  // sound function
  if (key === 'r') {
    recordAudio();
  } else if (key === 'p') {
    //playAudio();
  } else if (keyCode === BACKSPACE) {
    emptyRecordings();
  } else if (key === 's') {
    //shiftTrigBeat();
    shiftOn = !shiftOn;

    if (shiftOn) {
      console.log('shifting');
    } else {
      console.log('not shifting')
    }
  }
}