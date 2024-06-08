


const backgroundColor = "#FDF3ED";
const branchColor = "#9C7E6C";
let wishes = [];


window.onload = async () => {

  const response = await fetch("https://wishtreeapi.netlify.app/api/wishtree", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  wishes = await response.json();
}



const wishesParent = document.getElementById("wishes");
wishesParent.addEventListener(("click"), (event) => {

  if (!event.target.classList.contains("flower")) { return; }

  event.target.classList.add("fall");




});

/** @type { HTMLInputElement } */
const scribe = document.getElementById("scribe");
scribe.addEventListener(("keydown"), async (event) => {
  if (event.key !== "Enter") { return; }

  await fetch("https://wishtreeapi.netlify.app/api/wishtree", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: scribe.value })
  });

  wishes.push({ id: "", message: scribe.value });
  renderFlowers();

  scribe.value = "";

});

const gui = document.getElementById("gui");
const infoButton = document.getElementById("info-icon");
infoButton.addEventListener(("click"), () => {
  gui.classList.toggle("show");
})


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

for (let index = 0; index < 7; index++) {
    setTimeout(() => {
        growTree(index);
    }, 500 * index);
    
}

function growTree(index) {

    for (let i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished) {
          tree.push(tree[i].branchA());
          tree.push(tree[i].branchB());
        }
        tree[i].finished = true;
    }

    if (index > 2) {
        for (var i = 0; i < tree.length; i++) {
            if (!tree[i].finished) {
              let leaf = tree[i].end.copy();
              leaves.push(leaf);
            }
        }
    }

    if (index == 6) { renderFlowers(); }
    
}

// Render notes after update 
const renderFlowers = () => {
  const notes = wishes.map((wish, index) => {
    const leaf = leaves[index];
    const randomAngle = Math.floor(Math.random() * 81) - 40;
    return `<p class="flower" style="left: ${ leaf.x }px; top: ${ leaf.y }px; transform: translateX(-50%) translateY(-64%) rotate(${randomAngle}deg)"><span>${ wish.message }<span></p>`;

  });

  const markup = notes.join("");
  wishesParent.innerHTML = markup;
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


