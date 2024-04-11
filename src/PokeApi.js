const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn_prev')
const buttonNext = document.querySelector('.btn_next')

let searchPokemon = 1;



//Busca na Api os dados dos pokemons

export const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {

        const data = await APIResponse.json();

        return data;
    }

}

//Renderiza o pokemon e tras o nome do pokemon, seu numero e imagem 

export const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];

        input.value = "";
        searchPokemon = data.id;
    }
    else {
        pokemonName.innerHTML = 'Not found :c';
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
    }
}

//Função de submit do imput, anula o form com o preventdefault, da calback na função renderPokemon, adicionei as configurações dos buttons

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });
  
  buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });
  
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });
  

renderPokemon(searchPokemon)

