let singerSing = [false, false, false];//是否歌唱
let singerNotice = [false, false, false];//是否提示
let currentpos;
let circles = [];
const main=document.getElementById('main');
const vocal_1=document.getElementById('vocal1');
const vocal_2=document.getElementById('vocal2');
const vocal_3=document.getElementById('vocal3');
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(250, 250, 170);
  fill(115, 85, 70);
  rect(0, (3 * windowWidth) / 4, windowWidth, windowHeight / 4);
  for (i = 0; i < 4; i = i + 1) {
    //鼠标移动到头部时显示光圈
    currentpos = notice(((i + 1) * windowWidth) / 5);
    if (currentpos < 35) {
      singerNotice[i] = true;
    } else {
      singerNotice[i] = false;
    }
    if (singerNotice[i]) {
      fill(255);
      noStroke();
      circle(((i + 1) * windowWidth) / 5, windowHeight / 4, 80);
    }
    singerhead(((i + 1) * windowWidth) / 5);//画头
    
    if (singerSing[i]) {
      //画嘴
      fill(255, 0, 0);
      stroke(3);
     ellipse(((i + 1) * windowWidth) / 5, windowHeight / 4 + 15, 7,13);
      //音符（待画）
    }
    else{
      stroke(3);
      line(((i + 1) * windowWidth) / 5-5,windowHeight / 4 + 15,((i + 1) * windowWidth) / 5+5,windowHeight / 4 + 15);
    }
  }
  //音乐播放
  console.log(main);
  console.log(vocal_1);
  console.log(vocal_2);
  console.log(vocal_3);
  if(singerSing[1]){
    
  }
}
function singerhead(singerX) {
  //头函数
  push();
  translate(singerX, 0);
  //脸
  fill(250, 240, 240);
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
function singerbody(singerX) {
  //身体函数
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
