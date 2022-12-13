let singerSing = [false, false, false, false]; //是否歌唱
let singerSingPast = [false, false, false, false];
let singerNotice = [false, false, false, false]; //是否提示
let currentpos; //鼠标到圆心的距离
let circles = []; //头
let mySoundMain; //主旋律
let mySound1; //声部1
let mySound2; //声部2
let mySound3; //声部3
let soundPlaysList = []

let singers = [];
function preload() {
  soundFormats("mp3", "ogg");
  mySoundMain = loadSound("./主旋律.mp3");
  mySound1 = loadSound("./声部1.mp3");
  mySound2 = loadSound("./声部2.mp3");
  mySound3 = loadSound("./声部3.mp3");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  let a=new soundPlay();
  singers.push(a);
}

function draw() {
  background(180,50,40);
  fill(101, 57, 28);
  rect(0, windowHeight / 4+190, windowWidth, 3*windowHeight / 4-190);

  
  for (i = 0; i < 4; i = i + 1) {
    //鼠标移动到头部时显示光圈
    currentpos = notice(((i + 1) * windowWidth) / 5);
    if (currentpos < 35) {
      singerNotice[i] = true;
    } else {
      singerNotice[i] = false;
    }
    if (singerNotice[i]) {
      fill(255, 255, 255, 95);
      noStroke();
      circle(((i + 1) * windowWidth) / 5, windowHeight / 4, 83);
    }
    singerhead(((i + 1) * windowWidth) / 5);
    if (singerSing[i]) {
      //画嘴
      fill(255, 0, 0);
      stroke(3);
      ellipse(((i + 1) * windowWidth) / 5, windowHeight / 4 + 15, 7, 13);
      note(i); //音符
    } else {
      stroke(3);
      line(
        ((i + 1) * windowWidth) / 5 - 5,
        windowHeight / 4 + 15,
        ((i + 1) * windowWidth) / 5 + 5,
        windowHeight / 4 + 15
      );
    }
  }
   for(let i = 0; i < singers.length; i++){
    singers[i];
  }
}
function singerhead(singerX) {

  push();
  translate(singerX, 0);
  //身体
  fill(170,190,200);
  stroke(0);
  strokeWeight(1);
  ellipse(0,windowHeight / 4+75,120,100)
  ellipse(0,windowHeight / 4+90,90,150)
  //领子
  fill(255);
  triangle(0,windowHeight / 4+35,-5,windowHeight / 4+55,-30,windowHeight / 4+15);
  triangle(0,windowHeight / 4+35,5,windowHeight / 4+55,30,windowHeight / 4+15);
  circle(0,windowHeight / 4+35,5);
  circle(0,windowHeight / 4+55,5);
  circle(0,windowHeight / 4+65,5);
  circle(0,windowHeight / 4+75,5);
  //裙子
  fill(220,220,115);
  rect(-45, windowHeight / 4+90, 90, 100);
  rect(-45, windowHeight / 4+90, 90, 10);
  line(-30,windowHeight / 4+110,-30,windowHeight / 4+190);
  line(-15,windowHeight / 4+110,-15,windowHeight / 4+190);
  line(0,windowHeight / 4+110,0,windowHeight / 4+190);
  line(30,windowHeight / 4+110,30,windowHeight / 4+190);
  line(15,windowHeight / 4+110,15,windowHeight / 4+190);
  //脸
  fill(255,255,255);
  stroke(3);
  circle(0, windowHeight / 4, 70);
  //五官
  fill(0);
  ellipse(-10, windowHeight / 4 - 10, 5, 7);
  ellipse(10, windowHeight / 4 - 10, 5, 7);
  noFill();
  stroke(3);
  arc(0, windowHeight / 4, 7, 7, PI, 2 * PI, OPEN);
  pop();
}
function playMusic() {
  //true播放音乐
  if (singerSing[0] == true) {
    mySoundMain.setVolume(1);
    singerSingPast[0] = true;
  } else {
    mySoundMain.setVolume(0);
    singerSingPast[0] = false;
  }
  if (singerSing[1] == true) {
    mySound1.setVolume(1);
    singerSingPast[1] = true;
  } else {
    mySound1.setVolume(0);
    singerSingPast[1] = false;
  }
  if (singerSing[2] == true) {
    mySound2.setVolume(1);
    singerSingPast[2] = true;
  } else {
    mySound2.setVolume(0);
    singerSingPast[2] = false;
  }
  if (singerSing[3] == true) {
    mySound3.setVolume(1);
    singerSingPast[3] = true;
  } else {
    mySound3.setVolume(0);
    singerSingPast[3] = false;
  }
}
function note(i) {
  push();
  translate(((i + 1) * windowWidth) / 5, windowHeight / 4 + 25, 7);
  strokeWeight(5);
  stroke(250, 240, 165);
  line(10, -120, 40, -110); //横线
  line(10, -120, 10, -90); //left line
  line(40, -110, 40, -80);
  fill(250, 240, 165);
  ellipse(5, -90, 10, 7);
  ellipse(35, -80, 10, 7);
  pop();
  //右音符
  push();
  translate(((i + 1) * windowWidth) / 5 + 40, windowHeight / 4 - 20);
  strokeWeight(5);
  stroke(135, 135, 255);
  line(10, -120, 40, -110); //横线
  line(10, -110, 40, -100);
  line(10, -120, 10, -90); //left line
  line(40, -110, 40, -80);
  fill(135, 135, 255);
  ellipse(5, -90, 10, 7);
  ellipse(35, -80, 10, 7);
  pop();
}
function mousePressed() {
  //点击开始
  let x1 = mouseX;
  let y1 = mouseY;
  for (i = 0; i < 4; i++) {
    let l = dist(x1, y1, ((i + 1) * windowWidth) / 5, windowHeight / 4);
    if (
      (l < 35 && singerSing[i] == false) ||
      (l > 35 && singerSing[i] == true)
    ) {
      singerSing[i] = true;
    } else {
      singerSing[i] = false;
    }
  }
  //  mySoundMain.play()
  //  let a=new soundPlay();
  //  singers.push(a);

   for (i = 0; i < singers.length;  i + 1) {
    singers[i].display()
  }
}
function notice(singerX) {
  let x1 = mouseX;
  let y1 = mouseY;
  let l = dist(x1, y1, singerX, windowHeight / 4);
  return l;
}
class mouth {
  constructor() {
    this.sing = 0;
  }
  update() {}
  display(singerX) {
    pop();
    translate(singerX);
    ellipse(singerX);
  }
}
class soundPlay {
  constructor(start) {
    this.playing = false;
  }
  update() {}
  display() {
    console.log(111)
    for (i = 0; i < 4; i++) {
      if (singerSingPast[i] == true) {
        this.playing = true;
      }  
    }

    if (this.playing == true) {
      playMusic();
    } else {
      mySoundMain.stop();
      mySound1.stop();
      mySound2.stop();
      mySound3.stop();
      if (
        singerSing[0] == true ||
        singerSing[1] == true ||
        singerSing[2] == true ||
        singerSing[3] == true
      ) {
        mySoundMain.play();
        mySound1.play();
        mySound2.play();
        mySound3.play();
        playMusic();
      }
    }
  }
}