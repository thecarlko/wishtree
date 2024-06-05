



const backgroundColor = "#FDF3ED";
const branchColor = "#A44753"



let tree = [];
let leaves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height - (windowHeight * 0.25));
  let root = new Branch(a, b, 0);

  tree[0] = root;


}

function draw() {
    background(backgroundColor);
  
    for (let i = 0; i < tree.length; i++) {
      tree[i].show();
    }
  
}

for (let index = 0; index < 6; index++) {
    setTimeout(() => {
        growTree();
    }, 500 * index);
    
}

function growTree() {

    for (let i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished) {
          tree.push(tree[i].branchA());
          tree.push(tree[i].branchB());
        }
        tree[i].finished = true;
    }
}


// Generate a random floating-point number between min and max
function randomNumber(min, max) {
  let randomFloat = Math.random() * (max - min) + min;
  return Math.round(randomFloat * 10) / 10;
}
  
class Branch {

    constructor(begin, end, index) {
      this.begin = begin;
      this.end = end;
      this.finished = false;
      this.index = index;
    }
  
    show() {
      stroke(branchColor);
      strokeWeight((4 - (this.index * 0.5)));
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    jitter() {
        this.end.x += random(-1, 1);
        this.end.y += random(-1, 1);
    }
  
    branchA() {
      let dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(PI / randomNumber(5, 7));
      dir.mult(0.8);
      let newEnd = p5.Vector.add(this.end, dir);
      let b = new Branch(this.end, newEnd, this.index + 1);
      return b;
    }
  
    branchB() {
      let dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(-PI / randomNumber(5, 6.5));
      dir.mult(0.8);
      let newEnd = p5.Vector.add(this.end, dir);
      let b = new Branch(this.end, newEnd, this.index + 1);
      return b;
    }
}


