import './main.scss';

import Simulation from './Simulation'


(async function() {
  const simulation = new Simulation(
    100,
    1,
    1,
    4,
    400
  );

  await simulation.init();

  simulation.start();
})();
