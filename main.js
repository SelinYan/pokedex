const content = document.querySelector("#cards");
const generations = document.querySelectorAll(".generation");

const gen1 = "gen1";
const gen2 = "gen2";
const gen3 = "gen3";
const gen4 = "gen4";
const gen5 = "gen5";
const gen6 = "gen6";
const gen7 = "gen7";
const gen8 = "gen8";
const gen9 = "gen9";

let selectedGeneration;
let pokeData = [];

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
        };
      });
    });

  Promise.all(fetches).then((res) => {
    pokeData = res;
    pokeCards();
  });
};

/*
const fetchGeneration = async (gen) => {
  // fetch pokemon list
  const generationFetch = await fetch(
    `https://pokeapi.co/api/v2/generation/${gen}/`
  )
    .then((res) => res.json())
    // fetch each pokemon
    .then((generationData) => {
      //first API call
      return generationData.pokemon_species.map(async (item) => {
        //fetch each Pokemon 's url
        const res = await fetch(item.url);
        const data = await res.json();
        const officialArtwork = data.sprites.other["official-artwork"];

        return {
          id: data.id,
          name: data.name,
          img: officialArtwork ? officialArtwork.front_default : "",
          types: data.types,
        };
      });
    });
  Promise.all(generationFetch)
    .then((res) => {
      pokeData = res;
      pokeCards();
    })
    .catch((error) => console.log(error));
};
*/

const chooseGeneration = (id) => {
  switch (id) {
    case gen1:
      console.log(id);
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

const pokeCards = () => {
  const cards = pokeData
    .map((pokemon) => {
      return `<div>
  <img src="${pokemon.img}" alt="${pokemon.name}"/>
  <p>${pokemon.id}</p>
  <h2>${pokemon.name}</h2>
  <div>
    <p>${pokemon.types}</p>
    <p>${pokemon.height}, ${pokemon.weight}</p>
  </div>
</div>`;
    })
    .join("");

  content.innerHTML = cards;
};
fetchData();
