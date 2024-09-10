n = 16;
randomNumber = parseInt(Math.random()*n);
score = 0;
idlist = [];
bombflag = false;
height = "23%";
width = "23%";
const AUDIO1 = _("audio1");
const AUDIO2 = _("audio2");
const AUDIO3 = _("audio3");
const AUDIO4 = _("audio4");

function _(y){
    return document.getElementById(y)
}

function createBoxes(n){
    let boxs = "";
    for(let i=0;i<n;i++){
      boxs += `<span class='box' id='b${i}' onclick='crack(this,${i})' style='height: ${height}; width: ${width};'><div class="ibox1 ibox"></div><div class="ibox2 ibox"></div><div class="ibox3 ibox"></div><div class="ibox4 ibox"></div></span>`;
    }
    _("mine-wrapper").innerHTML = boxs;
}

function crack(box , n){

  if (!(idlist.includes(n)) && !(bombflag)){
    idlist.push(n)
    score++;
    box.style.background = "url('./assets/coin.gif') center no-repeat"
    box.style.backgroundColor = "rgb(49,53,45)";
    AUDIO2.play();
  }
  
  if (n === randomNumber){
    box.style.background="url('./assets/bomb.svg') center no-repeat"
    box.style.backgroundSize = "contain"
    box.style.backgroundColor = "rgb(49,53,45)"
    box.style.transitionDelay = "0.4s";
    _("stats").style.transitionDelay = "0.8s";
    AUDIO1.play()
    for (let i = 0; i < box.childNodes.length; i++) {
      const child = box.childNodes[i];
      if (child.nodeType === 1) {
        child.style.animation = `animate${i+1} 0.7s linear`;
      }
    }
    score--;
    bombflag=true;
  }

  display();
  _("score1").textContent = score;
}

function display(){
  if (score === n-1){
    _("fin-msg").textContent = "You Won";
    _("score").textContent = score;
    _("nextLevel").style.display = n!=36 ? "block" : "none";
    _("stats").style.opacity="1";
    _("stats").style.transform = "translate(-50%, -50%) rotate(0deg) scale(1)";
    _("stats").style.transitionDelay = "0.1s";
    AUDIO4.play()
  }
  else if (bombflag && score < n-1){
    _("fin-msg").textContent = "You Lost";
    _("nextLevel").style.display = "none";
    _("score").textContent = score;
    _("stats").style.opacity="1";
    _("stats").style.transform = "translate(-50%, -50%) rotate(0deg) scale(1)";
    setTimeout(function() {
      AUDIO3.play();
    }, 800);
  }
}

function reset(){
  if (n!=36){
    score = 0;
    _("score1").textContent = score;
    bombflag = false;
    idlist = [];
    randomNumber = parseInt(Math.random()*n);
    createBoxes(n)
    _("stats").style.transform = "translate(-50%, -50%) rotate(0deg) scale(0)";
    _("stats").style.opacity="0";
    _("stats").style.transitionDelay = "0.2s";
  }
  if (n === 36 && score === 35){
    score = 0;
    n=16;
    _("score1").textContent = score;
    bombflag = false;
    height = "23%";
    width = "23%";
    idlist = [];
    randomNumber = parseInt(Math.random()*n);
    createBoxes(n)
    _("stats").style.transform = "translate(-50%, -50%) rotate(0deg) scale(0)";
    _("stats").style.opacity="0";
    _("stats").style.transitionDelay = "0.2s";
  }
  if (n === 36 && score!=35){
    score = 0;
    _("score1").textContent = score;
    bombflag = false;
    idlist = [];
    randomNumber = parseInt(Math.random()*n);
    createBoxes(n)
    _("stats").style.transform = "translate(-50%, -50%) rotate(0deg) scale(0)";
    _("stats").style.opacity="0";
    _("stats").style.transitionDelay = "0.2s";
  }
}

function nextLevel() {
  if (n === 16) {
    n = 25;
    height = "18%";
    width = "18%";
    reset();
    createBoxes(n)
    _("level").textContent = "2"
  }
  else if (n === 25) {
    n = 36;
    height = "14.6%";
    width = "14.6%";
    reset();
    createBoxes(n)
    _("level").textContent = "3"
  }
}

createBoxes(n)