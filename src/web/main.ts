import './main.scss';

import Simulation from './Simulation'


(async function() {
  const simulation = new Simulation();

  await simulation.init();

  simulation.start();
})();
