const content = document.querySelector("#cards");
const generations = document.querySelectorAll(".generation");
let pokemonNum = document.querySelector("#numbers");
let generationNum = document.querySelector("#genNum");
const searchInput = document.querySelector("#searchInput");

const searchPokemon = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredData = pokeData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  pokeCards(filteredData);
};

const gen1 = "gen1";
const gen2 = "gen2";
const gen3 = "gen3";
const gen4 = "gen4";
const gen5 = "gen5";
const gen6 = "gen6";
const gen7 = "gen7";
const gen8 = "gen8";
const gen9 = "gen9";

let allpokeData = [];
// res can be any variable, eg response
const fetchData = async () => {
  const fetches = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
  )
    .then((res) => res.json())
    .then((data) => {
      //first API call
      return data.results.map(async (item) => {
        //fetch each Pokemon 's url
        const res = await fetch(item.url);
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          img: data.sprites.other["official-artwork"].front_default,
          types: data.types,
          height: data.height,
          weight: data.weight,
        };
      });
    });

  Promise.all(fetches).then((res) => {
    allpokeData = res;
    pokeData = allpokeData;
    pokeCards();
  });
};

const fetchGeneration = async (gen) => {
  try {
    const generationData = await fetch(
      `https://pokeapi.co/api/v2/generation/${gen}/`
    ).then((res) => res.json());

    const pokemonSpecies = generationData.pokemon_species;
    pokemonNum.textContent = pokemonSpecies.length;
    generationNum.textContent = gen;

    const fetches = pokemonSpecies.map(async (item) => {
      const res = await fetch(item.url);
      const data = await res.json();
      const pokemonRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${data.id}`
      );
      const pokemonData = await pokemonRes.json();
      const officialArtwork =
        pokemonData.sprites.other["official-artwork"].front_default ||
        pokemonData.sprites.front_default;
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        img: officialArtwork,
        types: pokemonData.types,
        height: pokemonData.height,
        weight: pokemonData.weight,
      };
    });

    const res = await Promise.all(fetches);
    pokeData = res.flat(); // Flatten the array of arrays
    pokeCards();
  } catch (error) {
    console.log(error);
  }
};

const chooseGeneration = (id) => {
  switch (id) {
    case gen1:
      return fetchGeneration(1);
    case gen2:
      return fetchGeneration(2);
    case gen3:
      return fetchGeneration(3);
    case gen4:
      return fetchGeneration(4);
    case gen5:
      return fetchGeneration(5);
    case gen6:
      return fetchGeneration(6);
    case gen7:
      return fetchGeneration(7);
    case gen8:
      return fetchGeneration(8);
    case gen9:
      return fetchGeneration(9);
  }
};

const pokeCards = (data = pokeData) => {
  const cards = data
    .map((pokemon) => {
      return `<div>
  <img src="${pokemon.img}" alt="${pokemon.name}"/>
  <span class="pokemon-id">#${pokemon.id}</span>
  <h2>${pokemon.name}</h2>
  <div>
      ${pokemon.types.map((type) => {
        return `<p>${type.type.name}</p>`;
      })}
    <p>Height:${pokemon.height}, Weight:${pokemon.weight}</p>
  </div>
</div>`;
    })
    .join("");

  content.innerHTML = cards;
};
fetchData();
