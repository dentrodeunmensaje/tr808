let kick, snare, hiHat, myPart;
let kickPat = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
let snarePat = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1];
let hiHatPat = [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1];

function preload(){
  userStartAudio();
  kick = loadSound('assets/kick-808.mp3');
  snare = loadSound('assets/snare-808.mp3');
  hiHat = loadSound('assets/hihat-808.mp3');
}

function setup(){
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.mousePressed(playAllParts);
  background(12,12,12);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text('click to play', width/2, height/2);

  let kickPhrase = new p5.Phrase('kick', playKick, kickPat);  
  let snarePhrase = new p5.Phrase('snare', playSnare, snarePat);  
  let hiHatPhrase = new p5.Phrase('hiHat', playHiHat, hiHatPat);    
  myPart = new p5.Part();  // Secuenciador completo
  myPart.addPhrase(kickPhrase);  
  myPart.addPhrase(snarePhrase);  
  myPart.addPhrase(hiHatPhrase);  
  myPart.setBPM(60);
}
function playAllParts(){
  myPart.loop();
  myPart.start();
}
function playKick(time, playbackRate){
  kick.rate(playbackRate);
  kick.play(time);
}
function playSnare(time, playbackRate){
  snare.rate(playbackRate);
  snare.play(time);
}
function playHiHat(time, playbackRate){
  hiHat.rate(playbackRate);
  hiHat.play(time);
}


function draw(){

}
