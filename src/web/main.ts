import './main.scss';

import Simulation from './Simulation'


(async function() {
  const input = document.querySelector('input');

  let simulation = getSimulation(Number.parseInt(input.value));
  let timeout;

  input.addEventListener('input', () => {
    // Cancel any onging timeouts as we want to fire only once.
    clearTimeout(timeout);

    // Set a new timeout.
    timeout = setTimeout(() => {
      // Remove the old simulation.
      simulation.dispose();

      // get the new Number of Planets
      const numberOfPlanets = getSanitizedInputValue(input.value);

      // Reset the input field
      input.value = `${numberOfPlanets}`;

      // Start the new Simulation.
      simulation = getSimulation(numberOfPlanets);
    }, 350);
  });
})();

function getSimulation(numberOfPlanets: number) {
  const simulation = new Simulation(numberOfPlanets, 0.8, 1, 6, 400);

  // Initialize and start the simulation async.
  simulation.init()
    .then(
      () => simulation.start()
    );

  // Meanwhile return the simulation.
  return simulation;
}


function getSanitizedInputValue(value: string) {
  return Math.min(Math.max(Number.parseInt(value), 2), 1000)
}
