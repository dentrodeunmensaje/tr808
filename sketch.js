let kick, snare, hiHat, myPart;
let kickPat = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
let snarePat = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1];
let hiHatPat = [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1];
let phraseVisualizer= [];


function preload(){
  userStartAudio();
  kick = loadSound('assets/kick-808.mp3');
  snare = loadSound('assets/snare-808.mp3');
  hiHat = loadSound('assets/hihat-808.mp3');
  for(let i = 0; i < 3; i++){
    if(i === 0) phraseVisualizer.push(new PhraseVisualizer(kickPat, 'kick'));
    if(i === 1) phraseVisualizer.push(new PhraseVisualizer(snarePat, 'snare'));
    if(i === 2) phraseVisualizer.push(new PhraseVisualizer(hiHatPat, 'hiHat'));
  }
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
  background(12,12,12);
  phraseVisualizer[0].drawPhrase();
  

}
//lets create a class that will hold all the information for our phrase visualizer
class PhraseVisualizer {
  constructor(seq, name){
    this.seq = seq;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;    
    this.name = name;
  }
  drawPhrase(){
    fill(255);
    text(this.name, width/2, height/4);
    for(let i = 0; i < this.seq.length; i++){
      let alpha;
      if(this.seq[i] === 1) {
         //red for the first 4 steps, orange for the next 4, and yellow for the next 4 and white for the last 4
        alpha = 255;
      } else {
        alpha = 20;
      }
       //red for the first 4 steps, orange for the next 4, and yellow for the next 4 and white for the last 4
      fill(255, 0, 0, alpha);
      if (i >= 4 && i < 8) fill(255, 165, 0, alpha);
      if (i >= 8 && i < 12) fill(255, 255, 0, alpha);
      if (i >= 12 && i < 16) fill(255, 255, 255, alpha);
      noStroke();
        rectMode(CENTER);
        rect((i*width/16)+(2*width/64)
          , height/2, width/22, height/10, 10);
          // a second smaller rectangle to inside the first one
        
        rect((i*width/16)+(2*width/64)
          , (height/2)+(height/50), width/28, height/18, 10);
          fill(255, 0, 0, alpha);
          circle((i*width/16)+(2*width/64)
          , (height/2)-(height/40), height/60);
          textAlign(CENTER, CENTER);
          textSize(20);
          fill(255,255,255, alpha);
          let stepNum= i+1;
          // turn i into a string
          let iString = stepNum.toString();
          //display the string
          text(iString, (i*width/16)+(2*width/64)
          , (height/2)-(height/12));
          let distance = dist(mouseX, mouseY, (i*width/16)+(2*width/64),(height/2));
          if(distance < 20){
            //fill(255, 255, 255, 255);
           cursor(HAND);
            if (mouseIsPressed){
              if(this.seq[i] === 1) this.seq[i] = 0;
              else this.seq[i] = 1;
            }
          }
  }

}
}

  


