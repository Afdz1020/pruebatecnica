const fecth = require('node-fetch');

class StarWars {
  async getPeliculas() {
    let peliculas = await fecth('https://swapi.co/api/films');
    let responsePeliculas = await peliculas.json();

    let planetasResponse = await this.formatInfoStarWars(
      responsePeliculas.results
    );
  }

  async formatInfoStarWars(starWarsInfo) {
    let infoFinal = [];
    for (const pelicula of starWarsInfo) {
      infoFinal.push({
        NombrePelicula: pelicula.title,
        planetas: await this.getPlanetas(pelicula.planets),
        Actores: await this.getCharacters(pelicula.characters)
      });
    }

    console.log(infoFinal);
  }

  async getPlanetas(planetas) {
    let infoPlanetas = [];
    for (const planeta of planetas) {
      let getPlanetas = await fecth(planeta.replace(/\/$/, ''));
      let resultsPlanetas = await getPlanetas.json();
      let resultFetch = {
        Nombre: resultsPlanetas.name,
        Terreno: resultsPlanetas.terrain,
        Gravedad: resultsPlanetas.gravity,
        Diametro: resultsPlanetas.diameter,
        Población: resultsPlanetas.population
      };
      infoPlanetas.push(resultFetch);
    }

    return infoPlanetas;
  }

  async getCharacters(characters) {
    let infoCharacters = [];
    for (const character of characters) {
      let getCharacter = await fecth(character.replace(/\/$/, ''));
      let resultsCharacters = await getCharacter.json();
      let resultFetch = {
        Nombre: resultsCharacters.name,
        Genero: resultsCharacters.gender,
        ColorCabello: resultsCharacters.hair_color,
        ColorPiel: resultsCharacters.skin_color,
        ColorOjos: resultsCharacters.eye_color,
        Estatura: resultsCharacters.height,
        Especie: await this.getEspecie(resultsCharacters.species)
      };
      infoCharacters.push(resultFetch);
    }

    return infoCharacters;
  }

  async getEspecie(urls) {
    let especies = {};
    for (const url of urls) {
      let getEspecie = await fecth(url.replace(/\/$/, ''));
      let resultsEspecie = await getEspecie.json();
      especies['Nombre'] = resultsEspecie.name;
      especies['Idioma'] = resultsEspecie.language;
      especies['Estatura'] = resultsEspecie.average_height;
    }

    return especies;
  }
}

module.exports = { StarWars };
