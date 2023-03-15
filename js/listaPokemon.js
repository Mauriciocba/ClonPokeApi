let lista = document.getElementById("lista");
let cardPoke = document.getElementById("cardPoke");
const apiUrl = 'https://pokeapi.co/api/v2/';
let links = document.getElementById("links");



function paginacion(url) {
  if (url) {
    lista.innerHTML = "";
    
    fetch(url)
      .then(res => res.json())
      .then(res => {
        for (let i of res.results) { 
          fetch(i.url)
            .then(x => x.json())
            .then(x => {
              lista.innerHTML += `<li class="list-group-item list-group-item-warning rounded mt-1 border shadow-sm px-0 py-1 hand" data-id="${x.id}">${x.name}</li>`;
              
            });
        };
        
        links.innerHTML = (res.previous) ? `<button class="btn btn-warning btn-sm mx-1 mt-3 " onclick="paginacion('${res.previous}')">Prev</button>` : "";
        
        links.innerHTML += (res.next) ? `<button class="btn btn-warning btn-sm mx-1 mt-3 " onclick="paginacion('${res.next}')">Next</button>` : "";
      });
  }

}

paginacion("https://pokeapi.co/api/v2/pokemon");

function getPokemonDetails(id) {
  const url = `${apiUrl}pokemon/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const nombre = data.name;
       const image = data.sprites.front_default;
       const tipos = data.types.map(tipo => tipo.type.name).join(', ');
       const altura = data.height
       const peso = data.weight
       
      const html = `
      <div class="container border" >
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
      <td> ${altura}cm
      </td>
      </tr>
      <tr>
      <th scope="row">Peso
      </th>
      <td class="divTableCell">${peso} kg
      </td>
      </tr>
      </tbody>
      </table>
      </div>`
      
      document.querySelector('#cardPoke').innerHTML = html;
      
    })
    .catch(() => {
      alert('Error');
      
    });
}




document.addEventListener('DOMContentLoaded', () => {
    // Cargar lista de Pokemones
    const url = `${apiUrl}pokemon?limit=20`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
       
          // Oculta el spinner
         spinner.setAttribute('hidden', true);
          
        const pokemonList = data.results.map(function(pokemon, index) {
          return `<li class="list-group-item list-group-item-warning rounded mt-1 border shadow-sm px-0 py-1 hand" data-id="${index + 1}">${pokemon.name}</li>`;
        });
        document.querySelector('#lista').innerHTML = pokemonList.join('');
      })
      .catch(() => {
        alert('Error');
      });
  
    // Manejar clic en Pokemon de la lista
    document.querySelector('#lista').addEventListener('click', event => {
      const pokemonId = event.target.getAttribute('data-id');
      getPokemonDetails(pokemonId);
    });
  });




  