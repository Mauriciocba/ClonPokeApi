 const pokemonLista = document.getElementById('pokemon-list');
 const buscar = document.getElementById('search');
 const botonBuscar = document.getElementById('search-button');
 let contenedorDiv = document.getElementById("contenedorApi")
 
 // Función que se ejecuta cuando se hace clic en el botón de búsqueda
 botonBuscar.addEventListener('click', () => {
   // Limpiamos la lista de Pokémon cada vez que se hace una búsqueda
   pokemonLista.innerHTML = '';
 
   // Obtenemos el valor de la caja de búsqueda
   const NombrePokemon = buscar.value.toLowerCase();
 
   // Hacemos una solicitud a la PokeAPI para obtener el Pokémon con el nombre buscado
   fetch(`https://pokeapi.co/api/v2/pokemon/${NombrePokemon}`)
     .then(response => response.json())
     .then(pokemon => {
       const nombre = pokemon.name;
       const image = pokemon.sprites.front_default;
       const tipos = pokemon.types.map(tipo => tipo.type.name).join(', ');
       const altura = pokemon.height
       const peso = pokemon.weight
        

        contenedorDiv.innerHTML = `<div class="container border">
        <div class="text-center ">
        <h1 class="display-3">${nombre}</h1>
        <img src="${image}" alt="bulbasaur" style="height: 12rem;">
        </div>
        <table class="table table-warning border shadow">
        <tbody>
        <tr>
        <th scope="row">Tipo</th>
        <td>${tipos}</td>
        </tr>
        <tr>
        <th scope="row">Altura
        </th>
        <td>${altura} cm
        </td>
        </tr>
        <tr>
        <th scope="row">Peso
        </th>
        <td class="divTableCell">${peso/1} kg
        </td>
        </tr>
        </tbody>
        </table>
        </div>`
             })
         }).catch(error => {
       // Si no se encuentra ningún Pokémon, mostramos un mensaje de error
       alert(`no se encontro ningun pokemon con ese nombre`)})
   



