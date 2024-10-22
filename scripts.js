const fetchedData = [];
const limit = 20;
const api = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;

const pokemonContainer = document.getElementById("parent");

const fetchData = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();

    const fetchPromises = data.results.map(async (result) => {
      const pokemonResponse = await fetch(result.url);
      return await pokemonResponse.json();
    });

    const pokemons = await Promise.all(fetchPromises);
    fetchedData.push(...pokemons);
    displayData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function displayData() {
  fetchedData.forEach((pokemon) => {
    let card = document.createElement("div");
    let cardInner = `
    <div class ="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${
      pokemon.name
    }" style="width:300px;height:300px;">
            </div>
            <div class="flip-card-back">
                <h1>${pokemon.name}</h1>
                <p>Types: ${pokemon.types
                  .map((t) => t.type.name)
                  .join(", ")}</p>
            </div>
        </div>
        </div>`;

    card.innerHTML = cardInner;
    pokemonContainer.append(card);
  });
}

fetchData(api);
