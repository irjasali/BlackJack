

export const muestraCadena = (cadena, jugador, puntosJ) => {
  document.getElementById(cadena).innerHTML = jugador + " - Puntos: " + puntosJ;  
}

export const empate=()=>{
  Swal.fire('! Empate !','Nadie Gana el Juego','error')   
}

export const ganaComputadora=()=>{  
  Swal.fire({
    title: `! La Computadora Gana !`,
    text: `* Suerte para la próxima *`,
    imageUrl: 'Assets/images/winner3.gif',
    imageWidth: 380,
    imageHeight: 230,
    imageAlt: 'Ganandor',
    color: '#D40B0B',              
  })
}
export const jugadorGana=(nombrejugador)=>{ 
  Swal.fire({
    title: `! ${nombrejugador} !`,
    text: `Felicidades Ganaste el juego`,
    imageUrl: 'Assets/images/winner2.gif',
    imageWidth: 380,
    imageHeight: 200,
    imageAlt: 'Ganandor',
    color: '#716add',              
  })
}
export function barajarMazo() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Mazo barajado correctamente',
    showConfirmButton: false,
    timer: 900
  });
}

