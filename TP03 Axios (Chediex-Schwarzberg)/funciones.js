function CargarPokemones() {
  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    .then((result) => {
      const pokemones = result.data.results;
      Card(pokemones);
    })
    .catch((error) => {
      console.log(error);
    });
}

function Card(pokemon)
{
  const container = document.getElementById('containerr')
  //$("#containerr").html("")
  container.innerHTML='';
  pokemon.map(pokemon => {
    let IdPoke = IdPokemon(pokemon.url);
    container.innerHTML += `
    <div class="card" type="button" onclick="GetPokemon(${IdPoke})">
    <!--<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${IdPoke}.png"/>-->
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${IdPoke}.png"/>
    <span>Nº.${IdPoke}</span>
    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    </card>
  `;
  
  });
}

function IdPokemon(url)
{
  return url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/','')
}

async function GetPokemon(id){
  $('#exampleModal').modal('toggle')
  console.log(id)
  await pokemon(id)
}

const pokemon = async (id) => {
  try{
    
    console.log("Id del pokemon: " + id)
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((resultado) =>{
      const data = resultado.data;
      console.log(data)
      const pokemon = {
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        imgJuego: data.sprites.front_default,
        imgJuegoEspalda: data.sprites.back_default,
        imgJuegoShiny: data.sprites.front_shiny,
        imgJuegoEspaldaShiny: data.sprites.back_shiny,
        imgCvg: data.sprites.other.dream_world.front_default,
        nombre: data.name,
        experiencia: data.base_experience,
        Hp: data.stats[0].base_stat,
        Atq: data.stats[1].base_stat,
        Def: data.stats[2].base_stat,
        Spa: data.stats[3].base_stat,
        Spd: data.stats[4].base_stat,
        Speed: data.stats[5].base_stat,
        Tipo: data.types,
        TipoPrinc: data.types[0].type.name
      };
      console.log(pokemon)
      MostrarPokemon(pokemon)
    })
  }catch(error){
    console.log(error)
  }
}


function MostrarPokemon(pokemon)
{
  const titulo = document.querySelector('#title')
  const datos = document.querySelector('#InfoPokemon')

  titulo.innerHTML = `<h1 class="text-center text-dark">${pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1)}</h1>`
  datos.innerHTML = `
  <div class="text-center">
  <img src="${pokemon.img}">
  <img src="${pokemon.imgJuego}">
  <img src="${pokemon.imgJuegoEspalda}">
  <img src="${pokemon.imgJuegoShiny}">
  <img src="${pokemon.imgJuegoEspaldaShiny}">
  </div>
  <span class="text-dark negrita">Tipos:<span>
  `
  pokemon.Tipo.map(tipo => {
      datos.innerHTML += `
      <span class="text-dark bold">${tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.slice(1)}</span>
      `
  });
  datos.innerHTML +=`
  <table id="tabla-estadisticas" class="tabla-estadisticas">
    <tbody>
        <tr>
          <th id="claro" colspan="2" rowspan="2" class="text-center titulo-tabla ">
            Stats
          </th>
        </tr>
      <tr>
      </tr>      
      <tr class="text-center barra-completa-hp">
        <th class="texto-tabla">
          <div class="nombre-stat">Hp:</div>
          <div class="numero-stat">${pokemon.Hp}</div>
        </th>
        <td class="barra-stat">
          <div class="hp" style="width:calc(100% * ${pokemon.Hp}/255)"></div>
        </td>
      </tr>
      <tr class="text-center barra-completa-atq">
        <th class="texto-tabla">
          <div class="nombre-stat">Ataque:</div>
          <div class="numero-stat">${pokemon.Atq}</div>
        </th>
        <td class="barra-stat" >
          <div class="atq" style="width:calc(100% * ${pokemon.Atq}/255)"></div>
        </td>     
      </tr>
      <tr class="text-center barra-completa-def">
        <th class="texto-tabla">
          <div class="nombre-stat">Defensa:</div>
          <div class="numero-stat">${pokemon.Def}</div>
        </th>
        <td class="barra-stat" >
          <div class="def" style="width:calc(100% * ${pokemon.Def}/255)"></div>
        </td>     
     </tr>
      <tr class="text-center barra-completa-spa">
        <th class="texto-tabla">
          <div class="nombre-stat">Sp.Atq:</div>
          <div class="numero-stat">${pokemon.Spa}</div>
        </th>
        <td class="barra-stat" >
          <div class="spa" style="width:calc(100% * ${pokemon.Spa}/255)"></div>
        </td>     
      </tr>
      <tr class="text-center barra-completa-spd">
        <th class="texto-tabla">
          <div class="nombre-stat">Sp.Def:</div>
          <div class="numero-stat">${pokemon.Spd}</div>
        </th>
        <td class="barra-stat" >
          <div class="spd" style="width:calc(100% * ${pokemon.Spd}/255)"></div>
        </td>
      </tr>
      <tr class="text-center barra-completa-speed">
        <th class="texto-tabla">
        <div class="nombre-stat">Speed:</div>
        <div class="numero-stat">${pokemon.Speed}</div>
        </th>
        <td class="barra-stat" >
          <div class="speed" style="width:calc(100% * ${pokemon.Speed}/255)"></div>
        </td>
      </tr>
      <tr id="claroo" class="">
        <th style="width:85px; padding-left:0.5em; padding-right:0.5em">
        <div class="nombre-stat">Total:</div>
        <div class="numero-stat">${pokemon.Hp + pokemon.Atq + pokemon.Def + pokemon.Spa + pokemon.Spd + pokemon.Speed}</div>
        </th>
        <td>
        </td>
      </tr>
  </tbody>
</table>
`
;
switch(pokemon.TipoPrinc)
{
  case "grass":
    $("#tabla-estadisticas").addClass("planta")
    $("#claro").addClass("planta-Claro")
    $("#claroo").addClass("planta-Claro")
    break;
  case "fire":
    $("#tabla-estadisticas").addClass("fuego")
    $("#claro").addClass("fuego-Claro")
    $("#claroo").addClass("fuego-Claro")
    break;
    
  case "water":
    $("#tabla-estadisticas").addClass("agua")
    $("#claro").addClass("agua-Claro")
    $("#claroo").addClass("agua-Claro")
    break;

  case "poison":
    $("#tabla-estadisticas").addClass("veneno")
    $("#claro").addClass("veneno-Claro")
    $("#claroo").addClass("veneno-Claro")
    break;

  case "flying":
    $("#tabla-estadisticas").addClass("volador")
    $("#claro").addClass("volador-Claro")
    $("#claroo").addClass("volador-Claro")
    break;

  case "dragon":
    $("#tabla-estadisticas").addClass("dragon")
    $("#claro").addClass("dragon-Claro")
    $("#claroo").addClass("dragon-Claro")
    break;

  case "normal":
    $("#tabla-estadisticas").addClass("normal")
    $("#claro").addClass("normal-Claro")
    $("#claroo").addClass("normal-Claro")
    break;

  case "ghost":
    $("#tabla-estadisticas").addClass("fantasma")
    $("#claro").addClass("fantasma-Claro")
    $("#claroo").addClass("fantasma-Claro")
    break;

  case "fighting":
    $("#tabla-estadisticas").addClass("lucha")
    $("#claro").addClass("lucha-Claro")
    $("#claroo").addClass("lucha-Claro")
    break;

  case "psychic":
    $("#tabla-estadisticas").addClass("psiquico")
    $("#claro").addClass("psiquico-Claro")
    $("#claroo").addClass("psiquico-Claro")
    break;

  case "dark":
    $("#tabla-estadisticas").addClass("siniestro")
    $("#claro").addClass("siniestro-Claro")
    $("#claroo").addClass("siniestro-Claro")
  break;

  case "electric":
    $("#tabla-estadisticas").addClass("electrico")
    $("#claro").addClass("electrico-Claro")
    $("#claroo").addClass("electrico-Claro")
    break;

  case "ground":
    $("#tabla-estadisticas").addClass("tierra")
    $("#claro").addClass("tierra-Claro")
    $("#claroo").addClass("tierra-Claro")
    break;

  case "rock":
    $("#tabla-estadisticas").addClass("roca")
    $("#claro").addClass("roca-Claro")
    $("#claroo").addClass("roca-Claro")
    break;

  case "steel":
    $("#tabla-estadisticas").addClass("acero")
    $("#claro").addClass("acero-Claro")
    $("#claroo").addClass("acero-Claro")
    break;

  case "ice":
    $("#tabla-estadisticas").addClass("hielo")
    $("#claro").addClass("hielo-Claro")
    $("#claroo").addClass("hielo-Claro")
    break;

  case "bug":
    $("#tabla-estadisticas").addClass("bicho")
    $("#claro").addClass("bicho-Claro")
    $("#claroo").addClass("bicho-Claro")
    break;

  case "fairy":
    $("#tabla-estadisticas").addClass("hada")
    $("#claro").addClass("hada-Claro")
    $("#claroo").addClass("hada-Claro")
    break;
}
}

