var flyingMen = [];

var text = document.getElementById("face");
var button = document.getElementById('btn');
var fsize = document.getElementById("fsize");
text.value = "✴︎";
text.color = "#86d0b053";
fsize.value = "60";
//emoji object
  function emoji(face, startx, starty, flour, fs, flyUpMax) {
    this.isAlive = true;
    this.face = face;
    this.x = startx;
    this.y = starty;
    this.flourLevel = flour;
    this.increment = -Math.floor((Math.random()*flyUpMax)+10);
    this.xincrement = Math.floor((Math.random()*10)+1);
    this.xincrement *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    this.element = document.createElement('div');
    this.element.innerHTML = face;
    this.element.style.position = "absolute";
    this.element.style.fontSize = fs + "px";
    this.element.style.color = "#44f1a6";
    document.getElementById("fa").appendChild(this.element);

    this.refresh = function(){
      if (this.isAlive) {
        //------Y axis-----
        
        
        
        
        this.y += this.increment;
        this.x += this.xincrement;
        this.increment += .75;
        
        if (this.y >= this.flourLevel) {
          if (this.increment <=1) {
            this.isAlive = false;
          }
         this.increment = 15;
        }
        
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
      } else {
        this.element.style.transform = "translate(px, px)";
      }
    }
    
  }



button.addEventListener("click", goB);


function goB() {
  var fontsize = fsize.value;
  var xv = (button.getBoundingClientRect().left + button.clientWidth/2) - (fontsize/2);
  var yv = (button.getBoundingClientRect().top + button.clientHeight/2) - (fontsize/2);
  var fl = button.getBoundingClientRect().top + 10000;
  var face = text.value;
  for (var i = 0; i < 8; i++) {
    var coolGuy = new emoji(face, xv, yv, fl, fontsize, 12);
    flyingMen.push(coolGuy);
  }

}



//Rendering
function render() {
  for (var i = 0; i < flyingMen.length; i++) {
    if (flyingMen[i].isAlive == true) {
      flyingMen[i].refresh();
    } else {
      flyingMen[i].element.remove();
      flyingMen.splice(i, 1);
    }
  }
  requestAnimationFrame(render);
}

render();