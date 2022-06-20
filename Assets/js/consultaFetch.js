
export const muestraCadena=(cadena,jugador,puntosJ)=> {
  document.getElementById(cadena).innerHTML = jugador + " - Puntos: " + puntosJ;
  return jugador;
}

export const consultaFetch= async()=>{
  let nom="";
    await Swal.fire({
        title: 'Introduza nombre del Jugador:',
        input: 'text',
        inputAttributes: {
        autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Jugar',
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
        fetch (`//api.github.com/users/${login}`)
            .then(response => {
              nom=login;          
              // nombreJugadorPantalla.innerHTML= nom + " - Puntos: " + 0;
              console.log({nom,login });
              muestraCadena("nombreJugadorPantalla",login,0)
              
              if (!response.ok) {
                throw new Error(response.statusText)               
              }          
              const obj = JSON.parse(login);
              console.log({obj});

              response.json();               
              return obj; 
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
             
          }) 
           
      
          
        }
      
      })     
    
      return nom; 
}



export const empate=()=>{
  Swal.fire(
    '! Empate !',
    'Nadie Gana el Juego',
    'error'
  )   
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