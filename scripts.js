let limit = 20;
const pokemonContainer = document.getElementById("parent");
const searchInput = document.getElementById("input-text")
const searchValue = searchInput.addEventListener('change', getSearchInput());


//load more
const loadMoreButton = document.getElementById("load-more-btn");
loadMoreButton.addEventListener('click', ()=> {
  limit+=20;
  fetchData(limit)
})
function getSearchInput(){
  console.log(searchInput.value)
}

console.log(searchValue)



// fetching data
const fetchData = async (limit) => {
  let fetchedData = [];
  console.log(fetchedData)
  try {
    console.log(limit)
    const api = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
    const response = await fetch(api);
    const data = await response.json();

    let fetchPromises = data.results.map(async (result) => {
      const pokemonResponse = await fetch(result.url);
      return await pokemonResponse.json();
    });

    const pokemons = await Promise.all(fetchPromises);
    fetchedData = pokemons
    displayData(fetchedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



// displaying data
function displayData(fetchedData) {
  pokemonContainer.innerHTML = ''
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

// filtering data

fetchData(limit)