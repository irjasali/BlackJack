export const consultaFetch=(jugador, puntosJugador)=>{

    Swal.fire({
        title: 'Introduza nombre del Jugador:',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Jugar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
         jugador = login;
         return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)               
              }             
              jugador = login;
              nombreJugadorPantalla.innerText = jugador + " - Puntos: " + puntosJugador;              
              return response.json()               
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
}