function OpenModal(numero) {
  document.getElementById("modal").style.display = "flex";
  const pantalla = document.querySelector("#modal");
  tarjeta(numero);

  // pokemones y carta  //

  function tarjeta(id2) {
    fetch(`https://pokeapi.co/api/v2/pokemon/` + id2)
      .then((response) => response.json())
      .then((data) => motrarTarjetaPokemon(data));
  }

  /* 
  Esta función tiene como objetivo formatear un número representado (peso y altura de los pokemones) 
  como cadena de texto (string) para que utilice una coma en lugar de un punto como separador decimal.
  */
  function formatPokemonInfo(value) {
    // El número value se convierte a una cadena de texto utilizando el método "toString()"
    const valueString = value.toString();
    /* 
    se utiliza el método "replace(".", ",")" para reemplazar todas las apariciones del 
    punto (.) en la cadena valueString con una coma (,). Esto es lo que convierte 
    el separador decimal de punto a coma. 
    */
    const commaFormatted = valueString.replace(".", ",");

    /* 
    La condición se utiliza para verificar si el número original (representado como una cadena de texto en valueString) tiene decimales o no. 

    Utilizamos el método indexOf() en la cadena valueString para buscar la posición del primer 
    punto (.) en la cadena. El método indexOf() devuelve la posición del carácter buscado en la cadena. 
    Si no se encuentra el carácter, devuelve -1.

    Luego, la expresión === -1 se utiliza para verificar si el resultado de indexOf() es igual a -1. 
    En otras palabras, estamos preguntando "¿El punto no se encontró en la cadena valueString?"
     */
    if (valueString.indexOf(".") === -1) {
      /* 
      Entonces, cuando esta condición se cumple (cuando el punto no se encuentra en la cadena), significa 
      que el número original no tiene decimales. En este caso, se ejecuta el bloque de código dentro del if:

      formateamos el número agregando ",0" al final de la cadena commaFormatted. 
      Esto asegura que el número tenga un cero decimal cuando no había decimales en el número original.
      */
      return commaFormatted + ",0";
    }

    // Devolvemos la cadena de texto formateada con el separador decimal modificado
    return commaFormatted;
  }

  function motrarTarjetaPokemon(poke) {
    const tipos = poke.types[0].type.name;

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
      pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
      pokeId = "0" + pokeId;
    }

    let abilities = poke.abilities.map(
      (ability) => `<p class="abilities">${ability.ability.name}<br></p>`
    );
    abilities = abilities.join(" ");

    // Obtiene el peso del Pokémon desde los datos llamados de la API
    const dataWeight = poke.weight;
    // El peso en hectogramos (almacenado en dataWeight) se convierte a kilogramos dividiendo por 10
    const weightKg = parseFloat(dataWeight) / 10.0;
    /* 
     Finalmente, se llama a la función formatPokemonInfo para formatear weightKg y 
     el resultado se almacena en la variable formattedWeight. Esta variable contendrá el peso formateado del Pokémon.
    */
    const formattedWeight = formatPokemonInfo(weightKg);

    // Obtiene la altura del Pokémon (en decímetros) desde los datos
    const heightData = poke.height;

    // Convierte la altura a tipo float (dividiendo por 10)
    const heightMetros = parseFloat(heightData) / 10.0;

    // Convierte la altura a una cadena de texto y reemplaza el punto por una coma
    const formattedHeight = formatPokemonInfo(heightMetros);

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.classList.add(`background_info_${poke.types[0].type.name}`);
    pantalla.innerHTML = "";
    tarjeta.innerHTML = `
          <div class="tarjeta">
            <svg
              class="rectangle-1"
              width="839"
              height="604"
              viewBox="0 0 839 604"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M104.875 0H809C825.569 0 839 13.4315 839 30V574C839 590.569 825.569 604 809 604H0L104.875 0Z"
                fill="#051B3F"
              />
            </svg>

            <div class="poke-global">
              <div class="poke-img">
                <img src="${poke.sprites.other["official-artwork"].front_default}" />
              </div>
              <div class="divider"></div>
              <div class="poke-content">
                <div class="close close_${tipos}" onclick="CloseModal()">
                  <img
                    onclick="CloseModal()"
                    src="./assets/img/close.png"
                  />
                </div>
                <div class="poke-info">
                  <div class="poke-id">
                    <div class="poke-number">
                      <h1>#${pokeId}</h1>
                    </div>
                    <div class="poke-name">
                      <div class="bulbasaur2">${poke.name}</div>
                    </div>
                  </div>
                  <div class="informacion color_font_${tipos}">Información</div>
                  <div class="atribute">
                    <div class="frame-2">
                      <div class="frame-1">
                        <div class="weight">
                          <img class="weight2" src="./assets/img/weight.png" />
                        </div>
                        <div class="_6-9-kg">${formattedWeight} kg</div>
                      </div>
                      <div class="peso">Peso</div>
                    </div>
                    <div class="divider2"></div>
                    <div class="frame-4">
                      <div class="frame-3">
                        <div class="ruler-vertical">
                          <img
                            class="ruler-vertical2"
                            src="./assets/img/rule.png"
                          />
                        </div>
                        <div class="_0-7-m">${formattedHeight} m</div>
                      </div>
                      <div class="altura">Altura</div>
                    </div>
                    <div class="divider2"></div>
                    <div class="frame-6">
                      <div class="frame-5">
                        <div class="semilla-espesura">
                          ${abilities}
                        </div>
                      </div>
                      <div class="categor-a-habilidad">
                        Categoría<br />Habilidad
                      </div>
                    </div>
                  </div>
                  <div class="estadisticas color_font_${tipos}">Estadísticas</div>
                  <div class="base-stats">
                    <div class="label">
                      <div class="hp color_font_${tipos}">HP</div>
                      <div class="atk color_font_${tipos}">ATK</div>
                      <div class="def color_font_${tipos}">DEF</div>
                      <div class="satk color_font_${tipos}">SATK</div>
                      <div class="sdef color_font_${tipos}">SDEF</div>
                      <div class="spd color_font_${tipos}">SPD</div>
                    </div>
                    <div class="divider"></div>
                    <div class="data">
                      <div class="_045">${poke.stats[0].base_stat}</div>
                      <div class="_049">${poke.stats[1].base_stat}</div>
                      <div class="_049">${poke.stats[2].base_stat}</div>
                      <div class="_065">${poke.stats[3].base_stat}</div>
                      <div class="_065">${poke.stats[4].base_stat}</div>
                      <div class="_045">${poke.stats[5].base_stat}</div>
                    </div>
                    <div class="chart-container">
                      <div class="chart">
                        <div class="value">
                          <progress class="progress-bar progress_bar_${tipos}" max="200" value="${poke.stats[0].base_stat}">${poke.stats[0].base_stat}</progress>
                        </div>
                      </div>
                      <div class="chart">
                        <div class="value">
                          <progress class="progress-bar progress_bar_${tipos}" max="200" value="${poke.stats[1].base_stat}">${poke.stats[1].base_stat}</progress>
                        </div>
                      </div>
                      <div class="chart">
                        <div class="value">
                          <progress class="progress-bar progress_bar_${tipos}" max="200" value="${poke.stats[2].base_stat}">${poke.stats[2].base_stat}</progress>
                        </div>
                      </div>
                      <div class="chart">
                        <div class="value">
                          <progress class="progress-bar progress_bar_${tipos}" max="200" value="${poke.stats[3].base_stat}">${poke.stats[3].base_stat}</progress>
                        </div>
                      </div>
                      <div class="chart">
                        <div class="value">
                          <progress class="progress-bar progress_bar_${tipos}" max="200" value="${poke.stats[4].base_stat}">${poke.stats[4].base_stat}</progress>
                        </div>
                      </div>
                      <div class="chart">
                        <div class="value">
                          <progress class="progress-bar progress_bar_${tipos}" max="200" value="${poke.stats[5].base_stat}">${poke.stats[5].base_stat}</progress>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
    pantalla.append(tarjeta);
  }
}

function CloseModal() {
  document.getElementById("modal").style.display = "none";
}
