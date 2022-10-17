const canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");    
const width = canvas.width;
const height = canvas.height;
getSpeed();
placar = [0,0]
// const avancado = document.getElementById('avançado');


document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { //Left
    	xJogador1(-1);
    } else if (event.key === 'ArrowRight') { //Right
    	xJogador1(1);
    }
    if (event.key === 'ArrowUp') { //Up
    	yJogador1(-1);
    } else if (event.key === 'ArrowDown') { //Down
    	yJogador1(1);
    }
});
document.addEventListener('keydown', event => {
    if (event.key === 'a') { //Left
    	xJogador2(-1);
    } else if (event.key === 'd') { //Right
    	xJogador2(1);
    }
    if (event.key === 'w') { //Up
    	yJogador2(-1);
    } else if (event.key === 's') { //Down
    	yJogador2(1);
    }
});

const quadra = () => {
    // window.onload = function() {
    //     var canvas = document.getElementById("game");
    //     var ctx = canvas.getContext("2d");
    //     //var img = document.getElementById("scream");
    //     ctx.drawImage("../img/quadra-1.png", 10, 10);
    //   };



    // const ctx = canvas.getContext('2d');

    // const bgImg = new Image();
    // bgImg.src = '../img/quadra-1.png';

    // bgImg.addEventListener("load", () => drawContent(ctx, bgImg), {once: true});
    
    // quadra_image = new Image();
    // quadra_image.src = '../img/quadra-1.png';
    // quadra_image.onload = function(){
    //     context.drawImage(quadra_image, 100, 20);
    // }
}


class Puck{
    constructor(spd)
    {
      this.x= width/2;
      this.y=height/2;
      this.dirX=1;
      this.dirY=1;
      this.radius = width*.03;
      this.speed= spd;
    }

    desenhaPuck() {
        ctx.beginPath();
        ctx.arc(this.x, this.y , this.radius ,0 ,2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    }

    // avancado.addEventListener('click', function onClick() {
    //     this.speed = 200;
    // });
    
    atualiza() 
    {

        this.x += this.dirX*this.speed;
        this.y += this.dirY*this.speed;
        
        //Aqui é a lógica pra impedir o puck de sair dos limites da quadra
        if(this.x + this.radius  > width || this.x - this.radius < 0) 
            this.dirX *= -1
        if(this.y + this.radius  > height || this.y - this.radius < 0) 
            this.dirY *= -1



        if(this.y - this.radius < 0) {
            if(this.x > width/3 && this.x < 2*width/3) {
                placar[0]=placar[0]+1
                if(placar[0] >=10)
                {
                    setWinner("Jogador 1 Venceu");
                    window.location.href='game_over.html';
                }
                this.x = width/2;
                this.y = height/2;
                this.dirX = 0;
                this.dirY = 1;
            } 
        } 
        else if (this.y + this.radius > height) {
            if(this.x > width/3 && this.x < 2*width/3) {
                placar[1]=placar[1]+1
                if(placar[1] >=10)
                {
                    setWinner("Jogador 2 Venceu");
                    window.location.href='game_over.html';
                }
                this.x = width/2;
                this.y = height/2;
                this.dirX = 0;
                this.dirY = -1;
            } 
        }
    }    
}

    function getDistance(x1, y1, x2, y2) {
        let xDistance = x2 - x1;       
        let yDistance = y2 - y1;       
        return Math.sqrt(Math.pow(xDistance ,2) + Math.pow(yDistance,2));
    }


class Jogador {
    constructor(x,y,cor) 
    {
        this.x = x;
        this.y = y;
        this.dirX=0;
        this.dirY=0;
        this.radius = width * 0.04;
        this.speed=5;
        this.slowdown=0.9;
        this.color= cor;
    }

    desenhaJogador() {
        ctx.beginPath();
        ctx.arc(this.x, this.y , this.radius ,0 ,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    atualiza() 
    {
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;
        this.dirX *= this.slowdown;
        this.dirY *= this.slowdown;  


        if(this.x + this.radius  > width || this.x - this.radius < 0) 
            this.dirX *= -1
        if(this.y + this.radius  > height || this.y - this.radius < 0) 
            this.dirY *= -1
    }
}


function yJogador1(offset) 
    {
        jogador1.dirY += offset;
    }
function xJogador1(offset) 
    {
        jogador1.dirX += offset;
    }
function yJogador2(offset) 
    {
        jogador2.dirY += offset;
    }
function xJogador2(offset) 
    {
        jogador2.dirX += offset;
    }


const jogador1 = new Jogador(width/2,height-100,"blue");
const jogador2 = new Jogador(width/2,height-500,"red");
const puck = new Puck(puckSpeed);

function fazAnimacao() {
    ctx.clearRect(0,0,width,height);
    quadra();
    jogador1.desenhaJogador();
    jogador1.atualiza();
    jogador2.desenhaJogador();
    jogador2.atualiza();
    puck.desenhaPuck();
    puck.atualiza();
    requestAnimationFrame(fazAnimacao);
    //Quando a distância é menor que o raio de ambos, então reagimos 
    if(getDistance(jogador1.x, jogador1.y, puck.x, puck.y) < jogador1.radius + puck.radius)  {
        if(jogador1.x>puck.x)
        {
          puck.dirX=-1
        }
        else
        {
          puck.dirX=1
        }

        puck.dirY *= -1;
    } 
    if(getDistance(jogador2.x, jogador2.y, puck.x, puck.y) < jogador2.radius + puck.radius)  {
        if(jogador2.x>puck.x)
        {
          puck.dirX=-1
        }
        else
        {
          puck.dirX=1
        }
        puck.dirY *= -1;
    }
  
  
}
fazAnimacao();