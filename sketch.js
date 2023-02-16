function setup(){
  createCanvas(400, 400);
  background(0);
}
function draw(){
  stroke(255);
  if(mouseIsPressed){
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}