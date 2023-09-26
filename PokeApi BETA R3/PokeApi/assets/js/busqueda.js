/* Animacion Buscador */
const toggleSearch = (search, button) => {
  const searchBar = document.getElementById(search),
    searchButton = document.getElementById(button);

  searchButton.addEventListener("click", () => {
    // Agregamos la clase show-search, para que la barra de búsqueda se expanda
    searchBar.classList.toggle("show-search");
  });
};
toggleSearch("search-bar", "search-button");

// Seleccionar el elemento de búsqueda
const buscador = document.getElementById("buscador");

//
// Seleccionar el elemento donde se mostrará el mensaje
const mensajeResultado = document.getElementById("mensaje-resultado");
mensajeResultado.style.textAlign = "center"; // Centrar el texto
mensajeResultado.style.marginTop = "20px"; // Añadir margen superior

// Establecer un evento "keyup" en el campo de búsqueda
buscador.addEventListener("keyup", (e) => {
  // Verificar si la tecla se presionó en el campo de búsqueda
  if (e.target.matches("#buscador")) {
    // Obtener el valor del campo de búsqueda
    const busqueda = e.target.value.toLowerCase();

    // Seleccionar todos los elementos con la clase CSS "pokemon"
    const pokemones = document.querySelectorAll(".pokemon");

    let pokemonEncontrado = false; // Variable para rastrear si se encontró algún Pokémon

    // Iterar sobre cada Pokémon
    pokemones.forEach((pokemon) => {
      const nombrePokemon = pokemon.textContent.toLowerCase();
      const pokemonCoincide = nombrePokemon.includes(busqueda);

      // Mostrar u ocultar Pokémon según la búsqueda
      if (pokemonCoincide) {
        pokemon.classList.remove("filtro");
        pokemonEncontrado = true;
      } else {
        pokemon.classList.add("filtro");
      }
    });

    // Mostrar u ocultar el mensaje de resultado
    if (pokemonEncontrado) {
      mensajeResultado.style.display = "none"; // Ocultar el mensaje si se encontraron Pokémon
    } else {
      mensajeResultado.style.display = "block"; // Mostrar el mensaje si no se encontraron Pokémon
    }
  }
});
