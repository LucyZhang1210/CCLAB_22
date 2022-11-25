
// declare empty array that will hold the redCellList
let redCellList = []; // 红细胞集合
let virusList = [];  // 病毒集合（就一个）
let virusPosition = [] // 病毒坐标
let signCellList = [];  // 信号细胞集合
let BCellList = [];  // B细胞集合
let signCellPosition = [];  // 信号细胞坐标（就一个）
let distanceXYR = []
let distanceXYB = []
let distanceXYANTI = []
let hasVirus = false // 病毒是否出现
let yellow // 黄色细胞
let antiList = []// 抗体细胞集合
let pointList = [] //死亡的病毒集合

let step = 1;

const RBCPosotionList = [
  [60, 10],
  [60, 100],
  [160, 50],
  [260, 80],
  [350, 330],
  [380, 90],
  [420, 60],
  [430, 200],
  [460, 430],
];

const BCellPosotionList = [
  [180,310],
  [100, 300],
  [200,370],
  [120,350]
]
function setup() {
  noFill();
  bezierDetail(5);
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");

}

function draw() { // draw函数在浏览器的每一帧触发，实现动画效果
    background(243, 190, 190);
  //spleen
  push();
  noStroke();
  translate(50, 400);
  rotate(-PI / 4);
  fill(255, 255, 255);
  ellipse(0, 0, 650, 450);
  fill(176, 176, 217); //大
  ellipse(0, 0, 630, 430); //小
  pop();
  fill(0);
  textSize(20);
  text("Spleen",30,480);
  text("Blood",400,480);
  textSize(15);
  fill(255,0,0);
  text("Introduction!!!",30,500);
  textSize(10);
  text("1.When you tap the screen for the first time, please tap on the red blood part .",30,515)
  text("2.Please tap the screen to continue to the next process after the image does not change.",30,530);

  // 病毒展示--控制病毒生命周期
  if (virusList.length && step!=5) { // 病毒展示
    virusList[0].display()
  }

  // 病毒尸体展示--控制病毒尸体生命周期
  if (pointList.length && step==5) { // 病毒展示
    for (let i = 0; i < pointList.length; i++) {
      pointList[i].display()
      console.log(i)
     }
    
  }

   // 遍历B细胞集合--控制B细胞生命周期
   for (let i = 0; i < BCellList.length; i++) {
   // 当信号细胞移动至B细胞旁边，B细胞消失
      if ((step >3 && i!=0) || step<=3) {
        BCellList[i].display()
      } 
  }

  // 遍历红细胞集合--控制红细胞生命周期
  for (let i = 0; i < redCellList.length; i++) {
    if (hasVirus && distanceXYR.length) {  // 当存在病毒时

      // 以该病毒为中心，开启动画
      // 条件一： 边长100以内的正方形范围内的红细胞移动向病毒
      if (Math.abs(distanceXYR[i][0]) < 100 && distanceXYR[i][1] < 100
        &&
        //条件二： 移动至病毒附近不再移动
        (!inScoped(redCellList[i].x, redCellList[i].y, virusList[0].x, virusList[0].y, 20))
      ) {
        // 每帧移动的距离
        redCellList[i].update(distanceXYR[i][0] / 100, distanceXYR[i][1] / 100);
        redCellList[i].display();
      } else { // 这个距离外的红细胞不动
        redCellList[i].display();
      }
    } else { // 不存在病毒时，只显示 不移动
      redCellList[i].display();
    }
  }

   // 遍历信号细胞集合--控制信号细胞生命周期
   for (let i = 0; i < signCellList.length; i++) {
    // 信号细胞开始移动，一直到接近目标B细胞
    if ((step==3) && (!inScoped(signCellList[i].x, signCellList[i].y, BCellPosotionList[0][0] , BCellPosotionList[0][1] , 12))){
      signCellList[i].update(distanceXYB[i][0] * Math.random() / 150, distanceXYB[i][1] * Math.random()/ 150);
    }
    // 信号细胞的声明周期：阶段三
    if (step ==3) {
      signCellList[i].display()
    }
  }

  // 黄色细胞展示--黄色细胞的生命周期
  if (yellow) { // 病毒展示
    yellow.display()
  }

  // 抗体细胞展示--抗体细胞的生命周期
  if (antiList.length) { // 病毒展示
    for (let i = 0; i < antiList.length; i++) {
    antiList[i].display()
    if ((step==4) && (!inScoped(antiList[i].x, antiList[i].y, virusList[0].x, virusList[0].y, 10))){
      antiList[i].update(distanceXYANTI[i][0] * Math.random() / 100, distanceXYANTI[i][1] * Math.random()/ 100);
    }
    }
  }


 
  for (let i = redCellList.length - 1; i >= 0; i--) {
    if (redCellList[i].offCanvas == true || redCellList[i].alive == false) {
      redCellList.splice(i, 1);
    }
  }

//  console.log("num sheep", redCellList.length)

}

function inScoped(x, y, x0, y0, limit) {
  let lx = x - x0
  let ly = y - y0
  let distance = Math.pow(lx * lx + ly * ly, .5)
  return distance < limit
}

// 红细胞类
class RedCeil {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update(x, y) {
    //movement
    this.x += x;
    this.y += y
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill('red');
    ellipseMode(CENTER);
    circle(0, 0, 15);
    fill(230, 10, 80)
    pop();
  }
}

// 病毒类
class Virus {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill('blue');
    fill(80, 125, 180);
    rect(-10, 0, 20, 20);
    triangle(-15, 0, 15, 0, 0, -10);
    fill(255,255,255);
    textSize(10);
    text("virus",-10,5);
    pop();
  }

}

// 死亡的病毒
class DeadVirus {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    stroke('blue')
    point(0, 0);
    fill(230, 10, 80)
    pop();
  }

}

// 信号细胞类
class SignCell {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update(x, y) {
    //movement
    this.x += x;
    this.y += y
  }
  display() {
    push();
    translate(this.x, this.y);
    // scale(1 + this.age / 1000);
    noStroke();
    fill('green');
    //ellipseMode(CENTER);
    //circle(0, 0, 10);
    textSize(15);
    text("virus!",-10,0)
    fill(230, 10, 80)
    pop();
  }
}

// B细胞类
class BCell {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update(x, y) {
    //movement
    this.x += x;
    this.y += y
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(156,39,176);
    ellipseMode(CENTER);
    circle(0, 0, 20);
    fill(230, 10, 80)
    pop();
  }
}

// 黄色细胞类
class YellowCell {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update(x, y) {
    //movement
    this.x += x;
    this.y += y
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255,152,0);
    ellipseMode(CENTER);
    circle(0, 0, 20);
    fill(230, 10, 80)
    pop();
  }
}

// 抗体细胞类
class AntiCell {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update(x, y) {
    //movement
    this.x += x;
    this.y += y
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255,87,34);
    ellipseMode(CENTER);
    rectMode(CENTER);
    rect(0, 0, 5, 5);
    
    fill(230, 10, 80)
    pop();
  }
}

// 鼠标按下触发
function mousePressed() {
  // 第一次按下，添加红细胞
  if (step === 1) {
    RBCPosotionList.forEach((item) => {
      let r = new RedCeil(item[0], item[1]);
      redCellList.push(r);
    })
    BCellPosotionList.forEach((item) => {
      let r = new BCell(item[0], item[1]);
      BCellList.push(r);
    })
    step += 1
    console.log(redCellList, '---');
  }
  // 第二次按下，添加病毒，红细胞运动 
  else if (step === 2) {
    if (hasVirus) return
    // 记录每个红细胞相对病毒的位置
    redCellList.forEach((item) => {
      distanceXYR.push([mouseX - item.x, mouseY - item.y])
    })
    // 添加病毒
    let v = new Virus(mouseX, mouseY);
    console.log([mouseX, mouseY], v)
    hasVirus = true
    virusPosition.push(mouseX, mouseY)
    virusList.push(v);
    console.log(distanceXYR)
    step += 1

    // 提前生成信号细胞的点位，在病毒周边
    signCellPosition.push(
      [mouseX,mouseY-15],
      [mouseX-15,mouseY+10],
      [mouseX+15,mouseY-10],
      [mouseX+15,mouseY+15],
      [mouseX-15,mouseY-15],
    )
    signCellPosition.forEach((item) => {
      distanceXYB.push([BCellPosotionList[0][0] - item[0] , BCellPosotionList[0][1] - item[1] ])
    })
  }
  // 第三次按下，step3分为两步，
  // 第一步创建信号细胞，移动至目标B细胞
  else if (step === 3) { 
    if (!signCellList.length){
      signCellPosition.forEach((item) => {
        let s = new SignCell(item[0], item[1]);
        signCellList.push(s);
      })
    }
    // 第二步进入阶段4,生成黄色细胞
    else {
       step += 1
      console.log(step,11)
      yellow = new YellowCell(BCellPosotionList[0][0] , BCellPosotionList[0][1]);

    }
    // step += 1
  }
   // 第五次按下，生成抗体细胞并运动至病毒周围
   else if (step === 4) { 
    if (!antiList.length){
      [
        [5,5,8,0],
        [-10,25,-8,0],
        [10,-20,0,8]  
      ].forEach((item)=>{
        let anti = new AntiCell(BCellPosotionList[0][0] + item[0], BCellPosotionList[0][1] + item[1])
        antiList.push(anti)
        distanceXYANTI.push(
          [virusPosition[0]  - BCellPosotionList[0][0] - item[0],virusPosition[1] - BCellPosotionList[0][1] - item[1]]
        )
      })
    }
    else {
      step += 1
      for (let i=0; i<50; i++){
        let dv = new DeadVirus((Math.random()*2-1) * 10 + virusPosition[0], (Math.random()*2-1) * 10 + virusPosition[1] )
        pointList.push(dv)
      }
      
    }
    
    console.log(pointList)
  }
}