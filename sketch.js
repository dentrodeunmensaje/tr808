let kick, snare, hiHat, openHat, lowTom, clap, clave, myPart;
let kickPat = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
let snarePat = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1];
let hiHatPat = [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1];
let openHatPat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let lowTomPat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let clapPat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0];
let clavePat = [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0];
let phraseVisualizer= [];
let tempo;
let tempoSlider;
let displayType;
let playButton;
let stopButton;
let clearButton;



function preload(){
  userStartAudio();
  kick = loadSound('assets/kick-808.mp3');
  snare = loadSound('assets/snare-808.mp3');
  hiHat = loadSound('assets/hihat-808.mp3');
  openHat = loadSound('assets/openhat-808.mp3');
  lowTom = loadSound('assets/lowtom-808.mp3');
  clave = loadSound('assets/clave-808.mp3');
  clap = loadSound('assets/clap-808.mp3');
  displayType = 'seq';
  
  tempo = 90;
  for(let i = 0; i < 8; i++){
    if(i === 0) phraseVisualizer.push(new PhraseVisualizer(kickPat, 'Kick'));
    if(i === 1) phraseVisualizer.push(new PhraseVisualizer(snarePat, 'Snare'));
    if(i === 2) phraseVisualizer.push(new PhraseVisualizer(hiHatPat, 'Hi hat'));
    if(i === 3) phraseVisualizer.push(new PhraseVisualizer(openHatPat, 'Open hat'));
    if(i === 4) phraseVisualizer.push(new PhraseVisualizer(lowTomPat, 'Conga'));
    if(i === 5) phraseVisualizer.push(new PhraseVisualizer(clavePat, 'Clave'));
    if(i === 6) phraseVisualizer.push(new PhraseVisualizer(clapPat, 'Clap'));
  }
}

function setup(){
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  //cnv.mousePressed(playAllParts);
  background(12,12,12);
 tempoSlider = createSlider(30,140,90,1);
 tempoSlider.position(width-200, height-50);
 tempoSlider.style('width', '80px')
 tempoSlider.input(updatetempo);
  playButton = createButton('▶️');
  playButton.position(width/2,height-75);
  playButton.mousePressed(changePlay);
  stopButton = createButton('⏹️');
  stopButton.position(width/2-40,height-75);
  stopButton.mousePressed(changeStop);
  clearButton = createButton('CLEAR PARTS');
  clearButton.position(width/2+40,height-75);
  clearButton.mousePressed(changeClear);
  let kickPhrase = new p5.Phrase('kick', playKick, kickPat);  
  let snarePhrase = new p5.Phrase('snare', playSnare, snarePat);  
  let hiHatPhrase = new p5.Phrase('hiHat', playHiHat, hiHatPat);    
  let openHatPhrase = new p5.Phrase('openHat', playopenHat, openHatPat);    
  let lowTomPhrase = new p5.Phrase('lowTom', playlowTom, lowTomPat);    
  let clapPhrase = new p5.Phrase('clap', playclap, clapPat);    
  let clavePhrase = new p5.Phrase('clave', playclave, clavePat);    
  myPart = new p5.Part();  // Secuenciador completo
  myPart.addPhrase(kickPhrase);  
  myPart.addPhrase(snarePhrase);  
  myPart.addPhrase(hiHatPhrase);  
  myPart.addPhrase(openHatPhrase);  
  myPart.addPhrase(lowTomPhrase);  
  myPart.addPhrase(clapPhrase);  
  myPart.addPhrase(clavePhrase);  
  myPart.setBPM(tempo);
}
function updatetempo(){
  tempo = tempoSlider.value();
  myPart.setBPM(tempo);
  //console.log('updatetempo changed')
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
function playopenHat(time, playbackRate){
  openHat.rate(playbackRate);
  openHat.play(time);
}
function playlowTom(time, playbackRate){
  hiHat.rate(playbackRate);
  hiHat.play(time);
}
function playclave(time, playbackRate){
  clave.rate(playbackRate);
  clave.play(time);
}
function playclap(time, playbackRate){
  clap.rate(playbackRate);
  clap.play(time);
}
function changePlay(){
  playAllParts();
}
function changeStop(){
 myPart.stop(); 
}
function changeClear(){
  
  phraseVisualizer[0].clearSeq();
  phraseVisualizer[1].clearSeq();
  phraseVisualizer[2].clearSeq();
  phraseVisualizer[3].clearSeq();
  phraseVisualizer[4].clearSeq();
  phraseVisualizer[5].clearSeq();
  phraseVisualizer[6].clearSeq();
    
}




function draw(){
  background(12,12,12);
  let val = tempoSlider.value();
  fill(255);
  textSize(24);
  text('Tempo',width-150, height-45);
  text (val.toString(), width-60, height-45);
  for (let index = 0; index < phraseVisualizer.length; index++) {
    const element = phraseVisualizer[index];
    element.drawPhrase(index);
  }
  
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
  clearSeq(){
    for(let i = 0; i < this.seq.length; i++){
      this.seq[i]=0;
    }
  }
  drawPhrase(num){
    
    for(let i = 0; i < this.seq.length; i++){
      let alpha;
      if(this.seq[i] === 1) {
        alpha = 255;
      } else {
        alpha = 30;
      }
       //red for the first 4 steps, orange for the next 4, and yellow for the next 4 and white for the last 4
      fill(255, 0, 0, alpha);
      if (i >= 4 && i < 8) fill(255, 165, 0, alpha);
      if (i >= 8 && i < 12) fill(255, 255, 0, alpha);
      if (i >= 12 && i < 16) fill(255, 255, 255, alpha);
      noStroke();
        push();
        translate(0, (height/this.seq.length)*(num*2))
        rectMode(CENTER);
        rect((i*width/16)+(2*width/64)
          , height/this.seq.length, width/22, height/10, 10);
          // a second smaller rectangle to inside the first one
        rect((i*width/16)+(2*width/64)
          , height/this.seq.length+15, width/28, height/18, 10);
          fill(255, 0, 0, alpha);
          circle((i*width/16)+(2*width/64)
          , height/this.seq.length-30, height/60);
          textAlign(CENTER, CENTER);
          textSize(16);
          fill(255,255,255, alpha);
          let stepNum= i+1;
          // turn i into a string
          let iString = stepNum.toString();
          //display the string
          text(iString, (i*width/16)+(2*width/64)
          , height/this.seq.length-50);
          pop();
          let distance = dist(mouseX, mouseY, (i*width/16)+(2*width/64),(height/this.seq.length)*(num*2));
          if(distance < 20){
            //fill(255, 255, 255, 255);
           cursor(HAND);
           noFill();
           strokeWeight(5);
           stroke(255);
           //rectMode(CENTER);
           //rect((i*width/16)+(2*width/64), (height/this.seq.length)*(num*2), width/22, height/10, 10);
            if (mouseIsPressed){
              if(this.seq[i] === 1) this.seq[i] = 0;
              else this.seq[i] = 1;
            }
          }else{
            cursor(ARROW);
          }
  }
  fill(255);
  textSize(32);
  text(this.name, width/this.seq.length, (height/this.seq.length)*(num*2)+50);
}
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  tempoSlider.position(width-200, height-50);
  playButton.position(width/2,height-75);
  stopButton.position(width/2-40,height-75);
  clearButton.position(width/2+40,height-75);
}

  


