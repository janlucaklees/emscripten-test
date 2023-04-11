import './main.scss';

import Simulation from './Simulation'


(async function() {
  const simulation = new Simulation(
    100,
    0.8,
    1,
    6,
    400
  );

  await simulation.init();

  simulation.start();
})();
