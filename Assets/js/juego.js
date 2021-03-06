import {empate, ganaComputadora, barajarMazo, muestraCadena, jugadorGana} from './consultaFetch.js';

/* Patrón Módulo */ 
(() =>{
  'use strict'            
      let deck = [];
      const tipos = ["C", "D", "H", "S"],
            cartasEspeciales = ["A", "J", "Q", "K"];
      let puntosJugador = 0,
          puntosComputadora = 0;
      let jugador="";   

      // Referencias del HTML
      const btnPedirCarta = document.querySelector("#btnPedirCarta"),
            btnDetener = document.querySelector("#btnDetener"),
            puntosHtml = document.querySelectorAll("small"),
            divCartasJugador = document.querySelector("#jugador-cartas"),
            divCartasComputadora = document.querySelector("#computadora-cartas"),
            btnNuevoJuego = document.querySelector("#btnNuevoJuego"),
            nombreJugadorPantalla = document.getElementById("nombreJugadorPantalla");
      /* Creación de la función para crear deck */   

      btnDetener.disabled = true;
      btnPedirCarta.disabled = true;     

      const barajarDeck = () => {      
          Swal.fire({
            title: 'Introduza nombre del Jugador:',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Jugar',
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {     
             try {
                const response = await fetch(`//api.github.com/users/${login}`);
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                jugador = login;
                console.log(jugador);
                muestraCadena("nombreJugadorPantalla", login, puntosJugador);
                return await response.json();
              } catch (error) {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                );
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
              })
             return result.value.login;
            }
          })
        };

      const crearDeck = () => {
            /* Creando los elementos del arreglo Las cartas van del número 2 al 10, más  las cartas especiales */
            deck = []; 
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
            return _.shuffle(deck);         
        };

      /* Función que me permite tomar  una carta */

      const pedirCarta = () => {
          if (deck.length === 0) {
              throw "No hay cartas en el Mazo";
          }       
          return deck.pop();
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
            empate()
          } else if (puntosMinimos > 21) {
            ganaComputadora();
          } else if (puntosComputadora > 21) {
            jugadorGana(jugador);       
          } else {
            ganaComputadora();
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
        muestraCadena("nombreJugadorPantalla",jugador, puntosJugador )        
          if (puntosJugador > 21) {        
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
          } else if (puntosJugador === 21) {      
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);          }
        saveLocalStorage();
      });

      btnDetener.addEventListener("click", () => {
          btnPedirCarta.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador);  
      });

      btnNuevoJuego.addEventListener("click", () => {    
   
        soundFest("play");
          console.clear();      
          resetValues();
          barajarDeck();          
          deck = crearDeck();
          btnDetener.disabled = false;
          btnPedirCarta.disabled = false;
          btnBarajar.disabled = true;
          muestraCadena("nombreJugadorPantalla",jugador, puntosJugador )
          divCartasJugador.innerHTML = `<img class="carta" src="Assets/cartas/red_back.png">`;
          divCartasComputadora.innerHTML = `<img class="carta" src="Assets/cartas/red_back.png">`;       
         
     });

      btnBarajar.addEventListener("click", () => {      
        resetValues();
        deck = crearDeck();
        btnDetener.disabled = false;
        btnPedirCarta.disabled = false;
        btnBarajar.disabled = true;
        muestraCadena("nombreJugadorPantalla",jugador, puntosJugador )
        divCartasJugador.innerHTML = `<img class="carta" src="Assets/cartas/grey_back.png">`;
        divCartasComputadora.innerHTML = `<img class="carta" src="Assets/cartas/grey_back.png">`;
        barajarMazo(); 
      });


        const saveLocalStorage=()=>{
        localStorage.setItem("nombreJugador",jugador);
        localStorage.setItem("jugadorPuntos", puntosJugador);
        localStorage.setItem("computadoraPuntos", puntosComputadora);
       }

      const getLocalStorage=()=>{
        if ( localStorage.getItem("nombreJugador") ) {
          jugador = localStorage.getItem("nombreJugador");
          puntosHtml[0].innerText = puntosJugador = localStorage.getItem("jugadorPuntos");
          puntosHtml[1].innerText = puntosComputadora = localStorage.getItem("computadoraPuntos");
          nombreJugadorPantalla.innerText = jugador + " - Puntos: " + puntosJugador;     
          }  
      }

      const destroyStorage=()=> {
        localStorage.removeItem("nombreJugador");
        localStorage.removeItem("jugadorPuntos");
        localStorage.removeItem("computadoraPuntos");        
      }

      const resetValues =()=>{
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;
      }

      const soundFest =(valor)=>{
        const audio = new Audio("//manzdev.github.io/codevember2017/assets/eye-tiger.mp3");   
        audio.volume = 0.5;        
          switch (valor) {
          case "play": audio.play();break;
          case "pausa": audio.pause(); break;
          case "stop": audio.stop(); break;          
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


})();
