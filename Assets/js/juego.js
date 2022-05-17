let deck = [];
const tipos = ["C", "D", "H", "S"];
const cartasEspeciales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
    puntosComputadora = 0;
let jugador = "Jugador";

// Referencias del HTML
const btnPedirCarta = document.querySelector("#btnPedirCarta");
const btnDetener = document.querySelector("#btnDetener");
const puntosHtml = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const btnNuevoJuego = document.querySelector("#btnNuevoJuego");
const nombreJugadorPantalla = document.getElementById("nombreJugadorPantalla");

/* Creación de la función para crear deck */
btnDetener.disabled = true;
btnPedirCarta.disabled = true;


const barajarDeck = () => {
  crearDeck();
  jugador = prompt("Nombre:", "Jugador");
  if (jugador === null) {
    jugador = "Jugador";
  }
  nombreJugadorPantalla.innerText = jugador + " - Puntos: " + puntosJugador;
  document.querySelector('#aviso').innerText ="";
  document.querySelector('#aviso2').innerText +="";

  // Pregunta al Profesor
  // setTimeout(() => {
  //   for (let i = 0; i<= deck.length-1; i++) {
  //     const imgCarta = document.createElement("img");
  //     imgCarta.src = `Assets/cartas/${deck[i]}.png`;
  //     imgCarta.classList.add("carta_barajeada");
  //     divCartasComputadora.append(imgCarta);
  //     console.log(imgCarta)
  //   }
  // }, 500);

};


const crearDeck = () => {
  /*
       Creando los elementos del arreglo
       Las cartas van del número 2 al 10, más  las cartas especiales

    */
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (const tipo of tipos) {
    for (const especial of cartasEspeciales) {
      deck.push(especial + tipo);
    }
  }
  /* Desordenando las cartas con la libreria Underscore, con la función _.shuffle*/
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

/* Función que me permite tomar  una carta */

const pedirCarta = () => {
  if (deck.length === 0) {
    alert("No hay cartas en el Mazo");
    throw "No hay cartas en el Mazo";
  }
  const carta = deck.pop();
  return carta;
};

/* Función que determina el valor de la Carta */

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora;
    const imgCarta = document.createElement("img");
    imgCarta.src = `Assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      // alert("Nadie Gana");
      document.querySelector('.bg-modal').style.display = "flex";
      document.querySelector('#aviso').innerText ="Empate - Nadie Gana";
      document.querySelector('#aviso2').innerText ="*Intentelo Nuevamente*";
    } else if (puntosMinimos > 21) {
      // alert("*** La Computadora Gana - Suerte para la próxima ***");
      document.querySelector('.bg-modal').style.display = "flex";
      document.querySelector('#aviso').innerText ="La Computadora !Gana!";
      document.querySelector('#aviso2').innerText ="*Suerte para la próxima*";
    } else if (puntosComputadora > 21) {
      // alert("! Felicidades " + jugador + " Ganaste !");
      document.querySelector('.bg-modal').style.display = "flex";
      document.querySelector('#aviso').innerText =`Felicidades ${jugador}`;
      document.querySelector('#aviso2').innerText ="! Ganaste !";
    } else {
      // alert("Computadora Gana");
      document.querySelector('.bg-modal').style.display = "flex";
      document.querySelector('#aviso').innerText ="La Computadora !Gana!";
    }
  }, 500);
  btnBarajar.disabled = false;
};

// Eventos

btnPedirCarta.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;
  const imgCarta = document.createElement("img");
  imgCarta.src = `Assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);
  nombreJugadorPantalla.innerHTML = jugador + " - Puntos: " + puntosJugador;

  if (puntosJugador > 21) {
    console.warn("Perdiste");
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, Genial");
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
  console.log(puntosJugador, puntosComputadora)
  saveLocalStorage();
});

btnDetener.addEventListener("click", () => {
  btnPedirCarta.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
  
});

btnNuevoJuego.addEventListener("click", () => {
  barajarDeck();
  console.clear();
  puntosJugador = 0;
  puntosComputadora = 0;
  deck = [];
  deck = crearDeck();
  btnDetener.disabled = false;
  btnPedirCarta.disabled = false;
  btnBarajar.disabled = true;
  puntosHtml[0].innerText = 0;
  puntosHtml[1].innerText = 0;
  nombreJugadorPantalla.innerText = jugador + " - Puntos: " + puntosJugador;
  divCartasJugador.innerHTML = `<img class="carta" src="Assets/cartas/red_back.png">`;
  divCartasComputadora.innerHTML = `<img class="carta" src="Assets/cartas/red_back.png">`;
  localStorage.removeItem("nombreJugador",jugador);
  localStorage.removeItem("jugadorpuntos", puntosJugador);
  localStorage.removeItem("ComputadoraPuntos", puntosComputadora);

});

btnBarajar.addEventListener("click", () => {
  puntosJugador = 0;
  puntosComputadora = 0;
  deck = [];
  deck = crearDeck();
  btnDetener.disabled = false;
  btnPedirCarta.disabled = false;
  btnBarajar.disabled = true;
  puntosHtml[0].innerText = 0;
  puntosHtml[1].innerText = 0;
  nombreJugadorPantalla.innerText = jugador + " - Puntos: " + puntosJugador;
  divCartasJugador.innerHTML = `<img class="carta" src="Assets/cartas/grey_back.png">`;
  divCartasComputadora.innerHTML = `<img class="carta" src="Assets/cartas/grey_back.png">`;
});


document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});

const saveLocalStorage=()=>{
  localStorage.setItem("nombreJugador",jugador);
  localStorage.setItem("jugadorPuntos", puntosJugador);
  localStorage.setItem("computadoraPuntos", puntosComputadora);
  console.log(jugador, puntosJugador, puntosComputadora)
}

const getLocalStorage=()=>{
  if ( localStorage.getItem("nombreJugador") ) {
    jugador = localStorage.getItem("nombreJugador");
    puntosHtml[0].innerText = puntosJugador = localStorage.getItem("jugadorPuntos");
    puntosHtml[1].innerText = puntosComputadora = localStorage.getItem("computadoraPuntos");
    nombreJugadorPantalla.innerText = jugador + " - Puntos: " + puntosJugador; 
    
    console.log(jugador,puntosJugador, puntosComputadora )
  }  
}

window.addEventListener('beforeunload',(e)=>{
  saveLocalStorage();
  e.preventDefault();
  e.returnValue='';
  
})
window.addEventListener('load',(e)=>{
  getLocalStorage();
} )