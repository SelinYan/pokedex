const content = document.querySelector("#cards");

let pokeData = [];

// res can be any variable, eg response
const fetchData = async () => {
  const fetches = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=121&offset=0"
  )
    .then((res) => res.json())
    .then((data) => {
      //first API call
      return data.results.map(async (item) => {
        //fetch each Pokemon 's url
        const res = await fetch(item.url);
        const data = await res.json();
        console.log(data);
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
    console.log(poke);
  });
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
