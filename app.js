const argv = require('./config/yars').argv;
const { StarWars } = require('./controller/index');

const colors = require('colors');

const starWars = new StarWars();
let comando = argv._[0];

switch (comando) {
  case 'runApi':
    starWars.getPeliculas();
    break;
  default:
    console.log('Comando no reconocido');
}
