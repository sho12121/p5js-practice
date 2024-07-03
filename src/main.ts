import p5 from "p5"

let WW: number;
let WH: number;
let ww: number;
let wh: number;
let collisionbox_size: number;
let rows: number;
let cols: number;
//let array: number[][];

let p1: Person;
let b1: Box;




const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    WW = p.windowWidth;
    WH = p.windowHeight;
    ww = p.windowWidth / 100;
    wh = p.windowHeight / 100;
    p1 = new Person(ww * 10, wh * 10, 50, 50, 100, p);
    b1 = new Box(0, wh * 70, WW * 0.8, WH, "black", p);

    const elem5Arr = Array(5)

    console.assert(elem5Arr.length === 5)

    collisionbox_size = 200;
    rows = Math.floor(p.windowWidth / collisionbox_size);
    cols = Math.floor(p.windowHeight / collisionbox_size);

    //array = Array(rows).map(() => Array(cols).fill(0));


  };

  p.draw = () => {
    p.frameRate(60);
    p.background("rgb(63,88,70)");

    p1.display();
    p1.collision(0, true);
    p1.physics();
    b1.draw(true);

    // Visualize grid
    p.push();
    p.noFill();
    p.stroke("red");
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        p.rect(x * collisionbox_size, y * collisionbox_size, collisionbox_size, collisionbox_size);
      }
    }
    p.pop();
  };

  p.keyPressed = () => {
    if (p.keyCode === 32) {
      p1.y -= 2;
      p1.a = -10;
    }
  };
};

class Person {
  x: number;
  y: number;
  m: number;
  r: number;
  w: number;
  h: number;
  a: number;
  ax: number;
  rub: number;
  v: string;
  p: p5;

  constructor(px: number, py: number, pr: number, pw: number, ph: number, p: p5) {
    this.x = px;
    this.y = py;
    this.m = 50;
    this.r = pr;
    this.w = pw;
    this.h = ph;
    this.a = 0;
    this.ax = 0;
    this.rub = 0.3;
    this.v = "";
    this.p = p;
  }

  display() {
    this.p.push();
    this.p.noStroke();
    this.p.fill("black");
    this.p.circle(this.x, this.y, this.r);
    this.p.rect(this.x - this.r / 2, this.y + this.r / 2, this.w, this.h);
    this.p.pop();

    // Debug text
    this.p.text(this.ax, 10, 10);
    this.p.text(this.v, 10, 20);
  }

  physics() {
    const g = 9.8;
    this.a += (this.m * g) / 1000;

    if (this.y + this.h > wh * 70) this.a = 0;

    this.y += this.a;

    if (this.ax > 0) {
      this.ax -= this.rub;
      if (this.ax < -0.5 && !this.p.keyIsDown(this.p.RIGHT_ARROW)) this.ax = 0;
    }
    if (this.ax < 0) {
      this.ax += this.rub;
      if (this.ax > -0.5 && !this.p.keyIsDown(this.p.LEFT_ARROW)) this.ax = 0;
    }

    if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
      this.v = "R";
      this.ax += 0.5;
    }
    if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
      this.v = "L";
      this.ax -= 0.5;
    }

    this.x += this.ax;
  }

  collision(padding: number, show: boolean) {
    if (show) {
      this.p.push();
      this.p.noFill();
      this.p.rect(this.x - this.r / 2 - padding, this.y - this.r / 2 - padding, this.w + 2 * padding, this.h + this.r + 2 * padding);
      this.p.pop();
    }
  }
}

class Box {
  x: number;
  y: number;
  w: number;
  h: number;
  col: string;
  p: p5;

  constructor(x: number, y: number, w: number, h: number, c: string, p: p5) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = c;
    this.p = p;
  }

  draw(show: boolean) {
    if (show) {
      this.p.rect(this.x, this.y, this.w, this.h);
      this.p.fill(this.col);
    }
  }
}

new p5(sketch);


// class collisionP {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
//   check() {

//   }
// }

