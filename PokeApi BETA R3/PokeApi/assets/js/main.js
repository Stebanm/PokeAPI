const pokemonList = document.querySelector("#pokemonList");
const botonesTipos = document.querySelectorAll(".btn-pokemon");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

function showPokemon(poke) {
  // Genera la lista de tipos del Pokémon
  let tipos = poke.types.map(
    (type) => `<li class="${type.type.name} type">${type.type.name}</li>`
  );
  tipos = tipos.join("");

  // Formatea el ID del Pokémon
  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  // Crea el elemento HTML que muestra la información del Pokémon
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.classList.add(`color_background_${poke.types[0].type.name}`);
  div.innerHTML = `
            <div class="background-img">
              <div class="pokemon-id">
                <h2>#${pokeId}</h2>
              </div>
              <img
                src="${poke.sprites.other["official-artwork"].front_default}"
                alt="${poke.name}" onclick="OpenModal(${poke.id})"
              />
            </div>
            <div class="pokemon-info">
              <div class="pokemon-type">
                <ul>
                  ${tipos}
                </ul>
              </div>
              <div class="pokemon-name">
                <h2>${poke.name}</h2>
              </div>
            </div>
  `;

  // Agrega el elemento al HTML seleccionado anteriormente
  pokemonList.append(div);
}

/*
Cuando se hace click en un botón, se obtiene su id, y se utilizan las solicitudes fetch para obtener 
información sobre los Pokémon. Luego, los Pokémon se muestran o no en función del tipo del botón y 
se utilizan las funciones showPokemon(data) para mostrarlos en el elemento con el id "pokemonList". 
*/

botonesTipos.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    pokemonList.innerHTML = "";
    let pokemonEncontrado = false; // Variable para rastrear si se encontraron Pokémon

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            showPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              showPokemon(data);
              pokemonEncontrado = true; // Se encontró al menos un Pokémon
            }
          }

          // Verificar si no se encontraron Pokémon al final del ciclo
          if (i === 151 && !pokemonEncontrado) {
            const mensaje = document.createElement("p");
            mensaje.textContent =
              "No se ha encontrado ningún Pokémon de este tipo.";
            pokemonList.appendChild(mensaje);
          }
        });
    }
  })
);
