import './main.scss';

import Simulation from './Simulation'


(async function() {
  const simulation = new Simulation(5);

  await simulation.init();

  simulation.start();
})();
