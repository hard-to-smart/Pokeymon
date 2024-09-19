const parent = document.querySelector(".parent")

const pokemonList =[];
async function getAPI(limitVal, offsetVal){
const api_url = "https://pokeapi.co/api/v2/pokemon";
//adding query parameters using template literals
let limit = 0;
let offset =0;
limit+= limitVal;
offset+= offsetVal;
const full_api_url=  `${api_url}?limit=${limit}&offset=${offset}`;
console.log(full_api_url);
try{
    const response = await fetch(full_api_url);
    const data = await response.json()
    console.log(data)
    const loadNextData = data.next
    console.log(loadNextData)
    const pokemons = data.results;
    const eachPokemon=()=>{
        pokemons.map(async(pokemon) => {
            try{
            const pokeName = pokemon.name;
            const pokeUrl = await fetch(pokemon.url);
            const pokeType = pokeUrl.json().types.type;
            console.log(pokeName, pokeType)
            }catch(e){
                console.log(e)
            }

            console.log(pokeName, pokeUrl, pokeType)
        });
    }
    eachPokemon()

    
}
catch(e){
    console.log(e);
}

}


getAPI(1, 0);