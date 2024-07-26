var myGamePiece;
var imagine1;
var imagine2;
var imagine3;
var imagine4;
//fuoco
var fuoco;
var fuoco2;
var fuoco3;
var fuoco4;
var fuoco5;
var fuoco6;
//funzioni
var testotime;
var testovita;
var testovita2;
var testovita3;
var testovita4;
var testopunti;
var testopunti2;
var suono;
var suono2;
var suono3;
var suono4;
var suono5;
var suono6;
var suono7;
var suono8;
var nemici1 = [];
var nemici2 = [];
var nemici3 = [];
var nemici4 = [];
var nemici5 = [];
var nemici6 = [];
var nemici7 = [];
var moneta = [];
var monetap;
var t;
function startGame() {
    myGamePiece = new component(100, 200, "img2/m1.png", 64, 129,"image");
    fuoco = new component(50, 50, "img/fu1.png", 99999, 99,"image");
    fuoco2 = new component(50, 50, "img/fu1.png", 99999, 99,"image");
    fuoco3 = new component(50, 50, "img/fu1.png", 99999, 99,"image");
    fuoco4 = new component(50, 50, "img/fu1.png", 99999, 99,"image");
    fuoco5 = new component(50, 50, "img/fu1.png", 99999, 99,"image");
    fuoco6 = new component(50, 50, "img/fu1.png", 99999, 99,"image");
    monetap= new component(70, 70, "img/c1.png", 524, 1,"image");
    imagine1 = new component(170, 80, "img/gb2.png", 64, 129,"image");
    imagine2 = new component(100, 80, "img/k2.png", 64, 129,"image");
    imagine3 = new component(100, 80, "img/g4.png", 64, 129,"image");
    imagine4 = new component(100, 80, "img/c1.png", 64, 129,"image");
    myGamePiece.gravity = 2;
    t = new component(2000, 200, "img/tt.png", 0, 770,"image");
    musica = new sound('musica/cave.mp3');
    suono = new sound('musica/s1.wav');
    suono2 = new sound('musica/s2.wav');
    suono3 = new sound('musica/s3.wav');
    suono4 = new sound('musica/s4.wav');
    suono5 = new sound('musica/s5.wav');
    suono6 = new sound('musica/s6.wav');
    suono7 = new sound('musica/s7.wav');
    suono8 = new sound('musica/s8.wav');
    testovita = new component('50px','Consolas','white',42,53,'text');
    testotime = new component('50px','Consolas','white',1500,53,'text');
    testovita2 = new component('50px','Consolas','orange',42,123,'text');
    testovita3 = new component('50px','Consolas','blue',42,123,'text');
    testovita4 = new component('50px','Consolas','gold',42,123,'text');
    testopunti = new component('50px','Consolas','white',900,53,'text');
    testopunti2 = new component('50px','Consolas','white',620,53,'text');
    myBackground = new component(2000, 1200, "img/cave.png", 0, -410, "background");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 2000;
        this.canvas.height = 960;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.punti = 0;
        this.vitaMario=100;
        this.vitaMariof=0;
        this.vitaMariof2=0;
        this.vitaMarioo=0;
        this.monetar = 0;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
        }
        
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
        }
    
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
                this.image.src = color;
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
    
    this.newPos2 = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }    

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height -190;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
let velocita=0;
function s1(){
    if(myGameArea.monetar>10){
        suono4.play();
        velocita=20;
        myGameArea.monetar-=10;
    }
}

function s2(){
    if(myGameArea.monetar>20){
        suono4.play();
        myGameArea.vitaMario+=10;
        myGameArea.monetar-=20;
    }
}

function s3(){
    if(myGameArea.monetar>90){
        suono5.play();
        myGameArea.vitaMario+=100;
        myGameArea.monetar-=90;
    }
}

function s4(){
    if(myGameArea.monetar>500){
        suono5.play();
        myGameArea.vitaMario+=500;
        myGameArea.monetar-=500;
    }
}

function s5(){
    if(myGameArea.monetar>90){
        suono4.play();
        myGameArea.vitaMariof+=100;
        myGameArea.monetar-=90;
    }
}

function s6(){
    if(myGameArea.monetar>740){
        suono4.play();
        myGameArea.vitaMariof2+=100;
        myGameArea.vitaMariof=0;
        myGameArea.monetar-=750;
    }
}

function s7(){
    if(myGameArea.monetar>1000){
        suono4.play();
        myGameArea.vitaMariof2+=0;
        myGameArea.vitaMariof=0;
        myGameArea.vitaMarioo+=100;
        myGameArea.vitaMario+=5000;
        myGameArea.monetar-=1000;
    }
}

function s8(){
    if(myGameArea.monetar>10000){
        suono4.play();
        myGameArea.monetar-=10000;
        myGameArea.vitaMario=+1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
    }
}

setInterval(costume,10);
function costume(){
if(myGameArea.vitaMario>50){
    this.myGamePiece.width=100;
    this.myGamePiece.height=200;
    myGamePiece.image.src="img2/m1.png";
    if (myGameArea.keys && myGameArea.keys[37]) {
        num = Math.floor((Math.random() * 2) + 1); 
        if (num == 1) {
            myGamePiece.image.src = "img2/m5.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/m6.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/m7.png"; 
        }
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        num = Math.floor((Math.random() * 2) + 1); 
        if (num == 1) {
            myGamePiece.image.src = "img2/m2.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/m3.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/m4.png"; 
        }
    
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.image.src = "img2/mj2.png"; 
        suono2.play();
        if (myGameArea.keys && myGameArea.keys[37]) {
            myGamePiece.image.src = "img2/mj.png"; 
        }
        if (myGameArea.keys && myGameArea.keys[39]) {
            myGamePiece.image.src = "img2/mj2.png"; 
        }
    }
}else{
    myGameArea.vitaMariof=0;
    myGameArea.vitaMariof2=0;
    myGamePiece.image.src="img2/mp5.png";
    this.myGamePiece.width=100;
    this.myGamePiece.height=100;
    if (myGameArea.keys && myGameArea.keys[37]) {
        num = Math.floor((Math.random() * 2) + 1); 
        if (num == 1) {
            myGamePiece.image.src = "img2/mp7.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/mp8.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/mp9.png"; 
        }
    }
    
    if (myGameArea.keys && myGameArea.keys[39]) {
        num = Math.floor((Math.random() * 2) + 1); 
        if (num == 1) {
            myGamePiece.image.src = "img2/mp2.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/mp3.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/mp4.png"; 
        }
    
    }
    
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.image.src = "img2/mp1.png"; 
        suono6.play();
        if (myGameArea.keys && myGameArea.keys[37]) {
            myGamePiece.image.src = "img2/mp6.png"; 
        }
        if (myGameArea.keys && myGameArea.keys[39]) {
            myGamePiece.image.src = "img2/mp1.png"; 
        }
    }
} 

if(myGameArea.vitaMariof>0){
    myGamePiece.image.src = "img2/mf5.png"; 
    if (myGameArea.keys && myGameArea.keys[37]) {
        num = Math.floor((Math.random() * 2) + 1); 

        if (num == 1) {
            myGamePiece.image.src = "img2/mf6.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/mf7.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/mf8.png"; 
        }
    }
    
    if (myGameArea.keys && myGameArea.keys[39]) {
        num = Math.floor((Math.random() * 2) + 1); 
        if (num == 1) {
            myGamePiece.image.src = "img2/mf2.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/mf3.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/mf4.png"; 
        }
    }
    
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.image.src = "img2/mf.png"; 

        if (myGameArea.keys && myGameArea.keys[37]) {
            myGamePiece.image.src = "img2/mf10.png"; 
        }
        if (myGameArea.keys && myGameArea.keys[39]) {
            myGamePiece.image.src = "img2/mf.png"; 
        }
    }

}

if(myGameArea.vitaMariof2>0){
    myGamePiece.image.src = "img2/mpp5.png"; 
    if (myGameArea.keys && myGameArea.keys[37]) {
        num = Math.floor((Math.random() * 2) + 1); 

        if (num == 1) {
            myGamePiece.image.src = "img2/mpp6.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/mpp7.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/mpp8.png"; 
        }
    }
    
    if (myGameArea.keys && myGameArea.keys[39]) {
        num = Math.floor((Math.random() * 2) + 1); 
        if (num == 1) {
            myGamePiece.image.src = "img2/mpp2.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img2/mpp3.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img2/mpp4.png"; 
        }
    }
    
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.image.src = "img2/mpp.png"; 

        if (myGameArea.keys && myGameArea.keys[37]) {
            myGamePiece.image.src = "img2/mpp10.png"; 
        }
        if (myGameArea.keys && myGameArea.keys[39]) {
            myGamePiece.image.src = "img2/mpp.png"; 
        }
    }

}


if(myGameArea.vitaMarioo>0){
    myGamePiece.image.src = "img/mo5.png"; 
    if (myGameArea.keys && myGameArea.keys[37]) {
        num = Math.floor((Math.random() * 2) + 1); 

        if (num == 1) {
            myGamePiece.image.src = "img/mo6.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img/mo7.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img/mo8.png"; 
        }
    }
    
    if (myGameArea.keys && myGameArea.keys[39]) {
        num = Math.floor((Math.random() * 2) + 1); 
        if (num == 1) {
            myGamePiece.image.src = "img/mo2.png"; 
        } 
        if (num == 2) {
            myGamePiece.image.src = "img/mo3.png"; 
        } 
        if (num == 3) {
            myGamePiece.image.src = "img/mo4.png"; 
        }
    }
    
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.image.src = "img/mo.png"; 

        if (myGameArea.keys && myGameArea.keys[37]) {
            myGamePiece.image.src = "img/mo10.png"; 
        }
        if (myGameArea.keys && myGameArea.keys[39]) {
            myGamePiece.image.src = "img/mo.png"; 
        }
    }

}
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    myBackground.speedX = -4;
    myBackground.newPos();    
    myBackground.update();
    musica.play();
   
    if (myGameArea.keys && myGameArea.keys[37]){
        myGamePiece.speedX = -22-velocita; 
    }

    if (myGameArea.keys && myGameArea.keys[39]) {
        myGamePiece.speedX = 22+velocita; 
    }

    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.speedY =-45
    }
    
    if (myGameArea.keys && myGameArea.keys[40]) {
        myGamePiece.speedY =+12
    }
 
    if(myGamePiece.x>1980){
        myGamePiece.speedX = -22+velocita; 
    }
    if(myGamePiece.x<10){
        myGamePiece.speedX = 22+velocita; 
    }

    //zona clonazione
    if (myGameArea.frameNo == 1 || everyinterval(300)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 290;
        nemici1.push(new component(100, 100, "img/gb1.png", x, y, "image"));
    }

    if (myGameArea.frameNo == 1 || everyinterval(300)) {
        x = myGameArea.canvas.width - 2300;
        y = myGameArea.canvas.height - 290;
        nemici2.push(new component(100, 100, "img/gb1.png", x, y, "image"));
    }


    if(myGameArea.frameNo>900){

        if (myGameArea.frameNo == 1 || everyinterval(140)) {
            x = myGameArea.canvas.width ;
            y = myGameArea.canvas.height - 340;
            nemici3.push(new component(100, 150, "img/k1.png", x, y, "image"));
        }
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width -2000 ;
            y = myGameArea.canvas.height - 340;
            nemici4.push(new component(100, 150, "img/k3.png", x, y, "image"));
        }
    
    }

    if(myGameArea.frameNo>1300){
        if (myGameArea.frameNo == 1 || everyinterval(140)) {
            x = myGameArea.canvas.width ;
            y = myGameArea.canvas.height - 340;
            nemici5.push(new component(100, 150, "img/kb1.png", x, y, "image"));
        }

    }


    
    if(myGameArea.frameNo>1500){

        if (myGameArea.frameNo == 1 || everyinterval(200)) {
            x = myGameArea.canvas.width ;
            y = myGameArea.canvas.height - 340;
            nemici6.push(new component(100, 150, "img/kr.png", x, y, "image"));
        }

    }

    if(myGameArea.frameNo>10){
        if (myGameArea.frameNo == 1 || everyinterval(140)) {
            x = myGameArea.canvas.width ;
            y = myGameArea.canvas.height - 340;
            nemici5.push(new component(100, 150, "img/kb1.png", x, y, "image"));
        }

    }

    if (myGameArea.frameNo == 1 || everyinterval(80)) {
        num=Math.floor(Math.random()*500)+300;
        num2=Math.floor(Math.random()*60)+10;
        x = myGameArea.canvas.width;
        x2 = myGameArea.canvas.width -70;
        x3 = myGameArea.canvas.width -140;
        x4 = myGameArea.canvas.width -210;
        x5 = myGameArea.canvas.width -280;
        y = myGameArea.canvas.height - num;
  
        if(num2>50){
            moneta.push(new component(70, 70, "img/c3.png", x, y, "image"));
        }
        else if(num2>30){
            moneta.push(new component(70, 70, "img/c3.png", x, y, "image"));
            moneta.push(new component(70, 70, "img/c3.png", x2, y, "image"));
            moneta.push(new component(70, 70, "img/c3.png", x3, y, "image"));
        }else if(num2>10){
            moneta.push(new component(70, 70, "img/c3.png", x, y, "image"));
            moneta.push(new component(70, 70, "img/c3.png", x2, y, "image"));
            moneta.push(new component(70, 70, "img/c3.png", x3, y, "image"));
            moneta.push(new component(70, 70, "img/c3.png", x4, y, "image"));
            moneta.push(new component(70, 70, "img/c3.png", x5, y, "image"));
        }
    }

    if(myGameArea.vitaMariof>0){
        testovita2.text="MARIO fuoco:"+myGameArea.vitaMariof;
        testovita2.update();
    if (myGameArea.keys && myGameArea.keys[32]) {
        num=Math.floor(Math.random()*4)+1;
        fuoco.update();
        fuoco.newPos2();
        fuoco2.update();
        fuoco2.newPos2();
        fuoco.speedX=50;
        fuoco2.speedX=-50;
        suono8.play();
        if(num==1){
        fuoco.image.src="img/fu1.png";
        fuoco2.image.src="img/fu1.png";
        }
        if(num==2){
        fuoco.image.src="img/fu2.png";
        fuoco2.image.src="img/fu2.png";
        }
        if(num==3){
        fuoco.image.src="img/fu3.png"; 
        fuoco2.image.src="img/fu3.png";
        }
        if(num==4){
        fuoco.image.src="img/fu4.png";
        fuoco2.image.src="img/fu4.png";
        }

     }else{
        fuoco.x=myGamePiece.x;
        fuoco.y=myGamePiece.y+70;
        fuoco2.x=myGamePiece.x;
        fuoco2.y=myGamePiece.y+70;
     }

     if(fuoco.x>2000){
         fuoco.x=myGamePiece.x;
         fuoco.y=myGamePiece.y+70;
     }

    if(fuoco2.x<20){
        fuoco2.x=myGamePiece.x;
        fuoco2.y=myGamePiece.y+70;
    }

    }else{
        fuoco2.x=myGamePiece.x+9999;
        fuoco2.y=myGamePiece.y+9999;
    }

//plasma
    if(myGameArea.vitaMariof2>0){
        testovita3.text="MARIO plasma:"+myGameArea.vitaMariof2;
        testovita3.update();
    if (myGameArea.keys && myGameArea.keys[32]) {
        num=Math.floor(Math.random()*4)+1;
        fuoco3.update();
        fuoco3.newPos2();
        fuoco4.update();
        fuoco4.newPos2();
        this.fuoco3.width=100;
        this.fuoco3.height=100;
        this.fuoco4.width=100;
        this.fuoco4.height=100;
        fuoco3.speedX=56;
        fuoco4.speedX=-56;
        suono8.play();
        if(num==1){
        fuoco3.image.src="img/fp1.png";
        fuoco4.image.src="img/fp1.png";
        }
        if(num==2){
        fuoco3.image.src="img/fp2.png";
        fuoco4.image.src="img/fp2.png";
        }
        if(num==3){
        fuoco3.image.src="img/fp3.png"; 
        fuoco4.image.src="img/fp3.png";
        }
        if(num==4){
        fuoco3.image.src="img/fp4.png";
        fuoco4.image.src="img/fp4.png";
        }

     }else{
        fuoco3.x=myGamePiece.x;
        fuoco3.y=myGamePiece.y+70;
        fuoco4.x=myGamePiece.x;
        fuoco4.y=myGamePiece.y+70;
     }
     if(fuoco3.x>2000){
         fuoco3.x=myGamePiece.x;
         fuoco3.y=myGamePiece.y+70;
     }

     if(fuoco4.x<20){
        fuoco4.x=myGamePiece.x;
        fuoco4.y=myGamePiece.y+70;
    }

    }else{
        fuoco4.x=myGamePiece.x+99;
        fuoco4.y=myGamePiece.y+9999;
    }
 
//fuoco oro
    if(myGameArea.vitaMarioo>0){
        testovita4.text="MARIO oro:"+myGameArea.vitaMarioo;
        testovita4.update();
    if (myGameArea.keys && myGameArea.keys[32]) {
        num=Math.floor(Math.random()*4)+1;
        numd=Math.floor(Math.random()*4)-2;
        fuoco5.update();
        fuoco5.newPos2();
        fuoco6.update();
        fuoco6.newPos2();
        this.fuoco5.width=100;
        this.fuoco5.height=100;
        this.fuoco6.width=100;
        this.fuoco6.height=100;
        fuoco5.speedX=56;
        fuoco6.speedX=-56;
        fuoco5.speedY=numd;
        fuoco6.speedY=-numd;
        suono8.play();
        if(num==1){
        fuoco5.image.src="img/fo1.png";
        fuoco6.image.src="img/fo1.png";
        }
        if(num==2){
        fuoco5.image.src="img/fo2.png";
        fuoco6.image.src="img/fo2.png";
        }
        if(num==3){
        fuoco5.image.src="img/fo3.png"; 
        fuoco6.image.src="img/fo3.png";
        }
        if(num==4){
        fuoco5.image.src="img/fo4.png";
        fuoco6.image.src="img/fo4.png";
        }

     }else{
        fuoco5.x=myGamePiece.x;
        fuoco5.y=myGamePiece.y+70;
        fuoco6.x=myGamePiece.x;
        fuoco6.y=myGamePiece.y+70;
     }
     if(fuoco5.x>2000){
         fuoco5.x=myGamePiece.x;
         fuoco5.y=myGamePiece.y+70;

     }

     if(fuoco6.x<20){
        fuoco6.x=myGamePiece.x;
        fuoco6.y=myGamePiece.y+70;
        
    }

    }else{
        fuoco6.x=myGamePiece.x+99;
        fuoco6.y=myGamePiece.y+9999;
    }


    for (i = 0; i < nemici1.length; i += 1) {
        let n = Math.floor(Math.random() * 2) + 1;
        if (n == 1) {
            nemici1[i].image.src = "img/gb1.png";
        } 
        if (n == 2) {
            nemici1[i].image.src = "img/gb2.png";
        } 
        if (myGamePiece.crashWith(nemici1[i])) {
            if(myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[40]){
                myGameArea.punti+=100;
                suono3.play();    
                nemici1[i].x = -10000;
            }else{
                myGameArea.vitaMario-=1;
                suono7.play();
            }
        }

        nemici1[i].x += -5;
        nemici1[i].update();

      if (fuoco.crashWith(nemici1[i])) {
            nemici1[i].x=-10000;
            myGameArea.punti+=100;
            suono3.play();
            fuoco.x=myGamePiece.x;
            fuoco.y=myGamePiece.y+70;
      }
      if (fuoco2.crashWith(nemici1[i])) {
        nemici1[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
        fuoco2.x=myGamePiece.x;
        fuoco2.y=myGamePiece.y+70;
      }

      if (fuoco3.crashWith(nemici1[i]) || fuoco4.crashWith(nemici1[i])) {
        nemici1[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }

      if (fuoco5.crashWith(nemici1[i]) || fuoco6.crashWith(nemici1[i])) {
        nemici1[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }

        if(nemici1[i].x<1){
            nemici1.splice(i, 1);
            i--; 
        }
    }

    for (i = 0; i < nemici2.length; i += 1) {
        let n = Math.floor(Math.random() * 2) + 1;
        if (n == 1) {
            nemici2[i].image.src = "img/gb1.png";
        } 
        if (n == 2) {
            nemici2[i].image.src = "img/gb2.png";
        } 
        if (myGamePiece.crashWith(nemici2[i])) {
            if(myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[40]){
              nemici2[i].x=+10000;
              myGameArea.punti+=100;
              suono3.play();
            }else{
                myGameArea.vitaMario-=1;
                suono7.play();
            }
        }
        if (fuoco.crashWith(nemici2[i])) {
              nemici2[i].x=+10000;
              myGameArea.punti+=100;
              suono3.play();
              fuoco.x=myGamePiece.x;
              fuoco.y=myGamePiece.y+70;
        }
        if (fuoco2.crashWith(nemici2[i])) {
            nemici2[i].x=+10000;
            myGameArea.punti+=100;
            suono3.play();
            fuoco2.x=myGamePiece.x;
            fuoco2.y=myGamePiece.y+70;
      }
        nemici2[i].x += 3;
        nemici2[i].update();

        if (fuoco3.crashWith(nemici2[i])) {
            nemici2[i].x=+10000;
            myGameArea.punti+=100;
            suono3.play();
          }

          if (fuoco4.crashWith(nemici2[i])) {
            nemici2[i].x=+10000;
            myGameArea.punti+=100;
          }

          if (fuoco5.crashWith(nemici2[i]) || fuoco6.crashWith(nemici2[i])) {
            nemici2[i].x=+10000;
            myGameArea.punti+=100;
            suono3.play();
          }

        if(nemici2[i].x>2011){
            nemici2.splice(i, 1);
            i--; 
        }
    }
    //koopa verde
    for (i = 0; i < nemici3.length; i += 1) {
        let n = Math.floor(Math.random() * 2) + 1;

        if (myGamePiece.crashWith(nemici3[i])) {
            if(myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[40]){
                myGameArea.punti+=100;
                suono3.play();    
                nemici3[i].x = -10000;
            }else{
                myGameArea.vitaMario-=10;
                suono7.play();
            }
        }

        nemici3[i].x += -6;
        nemici3[i].update();

    if(nemici3[i].x<1400){
        if (n == 1) {
            nemici3[i].image.src = "img/kk.png";
        } 
        if (n == 2) {
            nemici3[i].image.src = "img/kk.png";
        } 
        nemici3[i].x += -16;
        nemici3[i].y = 670;
        this.nemici3[i].height=100;
    }else{
        if (n == 1) {
            nemici3[i].image.src = "img/k1.png";
        } 
        if (n == 2) {
            nemici3[i].image.src = "img/k2.png";
        } 
    }

      if (fuoco.crashWith(nemici3[i])) {
            nemici3[i].x=-10000;
            myGameArea.punti+=100;
            suono3.play();
            fuoco.x=myGamePiece.x;
            fuoco.y=myGamePiece.y+70;
      }
      if (fuoco2.crashWith(nemici3[i])) {
        nemici3[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
        fuoco2.x=myGamePiece.x;
        fuoco2.y=myGamePiece.y+70;
      }

      if (fuoco3.crashWith(nemici3[i]) || fuoco4.crashWith(nemici3[i])) {
        nemici3[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }

      if (fuoco5.crashWith(nemici3[i]) || fuoco6.crashWith(nemici3[i])) {
        nemici3[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }

        if(nemici3[i].x<1){
            nemici3.splice(i, 1);
            i--; 
        }
    }
//koopa verde 2
    for (i = 0; i < nemici4.length; i += 1) {
        let n = Math.floor(Math.random() * 2) + 1;

        if (myGamePiece.crashWith(nemici4[i])) {
            if(myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[40]){
                myGameArea.punti+=100;
                suono3.play();    
                nemici4[i].x = +10000;
            }else{
                myGameArea.vitaMario-=10;
                suono7.play();
            }
        }

        nemici4[i].x += 6;
        nemici4[i].update();

    if(nemici4[i].x>500){
        if (n == 1) {
            nemici4[i].image.src = "img/kk.png";
        } 
        if (n == 2) {
            nemici4[i].image.src = "img/kk.png";
        } 
        nemici4[i].x += 16;
        nemici4[i].y = 670;
        this.nemici4[i].height=100;
    }else{
        if (n == 1) {
            nemici4[i].image.src = "img/k3.png";
        } 
        if (n == 2) {
            nemici4[i].image.src = "img/k4.png";
        } 
    }

      if (fuoco.crashWith(nemici4[i])) {
            nemici4[i].x=+10000;
            myGameArea.punti+=100;
            suono3.play();
            fuoco.x=myGamePiece.x;
            fuoco.y=myGamePiece.y+70;
      }
      if (fuoco2.crashWith(nemici4[i])) {
        nemici4[i].x=+10000;
        myGameArea.punti+=100;
        suono3.play();
        fuoco2.x=myGamePiece.x;
        fuoco2.y=myGamePiece.y+70;
      }

      if (fuoco3.crashWith(nemici4[i]) || fuoco4.crashWith(nemici4[i]) || (fuoco5.crashWith(nemici4[i]) || fuoco6.crashWith(nemici4[i]))) {
        nemici4[i].x=+10000;
        myGameArea.punti+=100;
        suono3.play();
      }

        if(nemici4[i].x>2001){
            nemici4.splice(i, 1);
            i--; 
        }
    }
//koopa blu
    for (i = 0; i < nemici5.length; i += 1) {
        let n = Math.floor(Math.random() * 2) + 1;

        if (myGamePiece.crashWith(nemici5[i])) {
            if(myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[40]){
                myGameArea.punti+=100;
                suono3.play();    
                nemici5[i].x = -10000;
            }else{
                myGameArea.vitaMario-=10;
                suono7.play();
            }
        }

        nemici5[i].x += -8;
        nemici5[i].update();

    if(nemici5[i].x<1400){
        if (n == 1) {
            nemici5[i].image.src = "img/kkb.png";
        } 
        if (n == 2) {
            nemici5[i].image.src = "img/kkb.png";
        } 
        nemici5[i].x += -20;
        nemici5[i].y = 670;
        this.nemici5[i].height=100;
    }else{
        if (n == 1) {
            nemici5[i].image.src = "img/kb3.png";
        } 
        if (n == 2) {
            nemici5[i].image.src = "img/kb4.png";
        } 
    }

      if (fuoco.crashWith(nemici5[i])) {
            nemici5[i].x=-10000;
            myGameArea.punti+=100;
            suono3.play();
            fuoco.x=myGamePiece.x;
            fuoco.y=myGamePiece.y+70;
      }
      if (fuoco2.crashWith(nemici5[i])) {
        nemici5[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
        fuoco2.x=myGamePiece.x;
        fuoco2.y=myGamePiece.y+70;
      }

      if (fuoco3.crashWith(nemici5[i]) || fuoco4.crashWith(nemici5[i])) {
        nemici5[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }

      if (fuoco5.crashWith(nemici5[i]) || fuoco6.crashWith(nemici5[i])) {
        nemici5[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }

        if(nemici5[i].x<1){
            nemici5.splice(i, 1);
            i--; 
        }
    }

//koopa rosso
    for (i = 0; i < nemici6.length; i += 1) {
        let n = Math.floor(Math.random() * 2) + 1;
        if (myGamePiece.crashWith(nemici6[i])) {
            if(myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[40]){
                myGameArea.punti+=100;
                suono3.play();    
                nemici6[i].x = -10000;
            }else{
                myGameArea.vitaMario-=10;
                suono7.play();
            }
        }
        nemici6[i].x += -18;
        nemici6[i].update();
    if(nemici6[i].x<1400){
        if (n == 1) {
            nemici6[i].image.src = "img/kkr.png";
        } 
        if (n == 2) {
            nemici6[i].image.src = "img/kkr.png";
        } 
        nemici6[i].x += -28;
        nemici6[i].y = 670;
        this.nemici6[i].height=100;
    }else{
        if (n == 1) {
            nemici6[i].image.src = "img/kr.png";
        } 
        if (n == 2) {
            nemici6[i].image.src = "img/kr2.png";
        } 
    }
      if (fuoco.crashWith(nemici6[i])) {
            nemici6[i].x=-10000;
            myGameArea.punti+=100;
            suono3.play();
            fuoco.x=myGamePiece.x;
            fuoco.y=myGamePiece.y+70;
      }
      if (fuoco2.crashWith(nemici6[i])) {
        nemici6[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
        fuoco2.x=myGamePiece.x;
        fuoco2.y=myGamePiece.y+70;
      }
      if (fuoco3.crashWith(nemici6[i]) || fuoco4.crashWith(nemici6[i])) {
        nemici6[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }
      if (fuoco5.crashWith(nemici6[i]) || fuoco6.crashWith(nemici6[i])) {
        nemici6[i].x=-10000;
        myGameArea.punti+=100;
        suono3.play();
      }
        if(nemici6[i].x<1){
            nemici6.splice(i, 1);
            i--; 
        }
    }

    for (i = 0; i < moneta.length; i += 1) {
        let n = Math.floor(Math.random() * 1) + 1;
        if (n == 1) {
            moneta[i].image.src = "img/c1.png";
        } 
        moneta[i].x += -4;
        moneta[i].update();

        if (myGamePiece.crashWith(moneta[i])) {
         myGameArea.monetar+=1;
         suono.play();
         moneta.splice(i, 1);
         i--; 
        }
    }

    if(myGameArea.frameNo>8000){
        location.href = "win.html";
    }
    
    if(myGameArea.vitaMario<0){
        location.href = "lose.html";
    }

    testovita.text="MARIO:"+myGameArea.vitaMario;
    testovita.update();
    testopunti.text="PUNTEGGIO:"+myGameArea.punti;
    testopunti.update();
    testotime.text="TEMPO:"+myGameArea.frameNo+"=8000";
    testotime.update();
    testopunti2.text="X:"+myGameArea.monetar;
    testopunti2.update();
    monetap.update();
    myGamePiece.newPos2();
    myGamePiece.update();
 
    t.update();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    if (!myGameArea.interval) {myGameArea.interval = setInterval(updateGameArea, 20);}
    myGamePiece.gravity = n;
}

