const content = document.querySelector(".section");

const pokeData = [1, 2, 3, 4, 5];

// res can be any variable, eg response
const fetchData = async () => {
  await fetch("https://pokeapi.co/api/v2/pokemon?limit=121&offset=0")
    .then((res) => res.json())
    .then((data) => {
      const fetches = data.results.map((item) => {
        return fetch(item.url)
          .then((res) => res.json())
          .then((data) => {
            return {
              id: data.id,
              name: data.name,
              img: data.sprites.other["official-artwork"].front_default,
              types: data.types,
            };
          });
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
      return `<div class="card">
    <img src="./img/pikachu.jpg" />
    <p class="id">${pokemon.id}</p>
    <div class="container">
      <h2 class="id">name</h2>
    </div>
  </div>`;
    })
    .join("");

  content.innerHTML = cards;
};

fetchData();
