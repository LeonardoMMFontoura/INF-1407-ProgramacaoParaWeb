var Winner= "None";
var puckSpeed =5;

function setSpeed(n)
{
  localStorage.setItem("velocidade",n);
}
function getSpeed()
{
  puckSpeed = localStorage.getItem("velocidade");
}

function setWinner(n)
{
  localStorage.setItem("Vencedor",n);
}
function getWinner()
{
  document.getElementById('Winner').textContent = localStorage.getItem("Vencedor");;
}