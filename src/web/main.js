import initSimulation from './simulation.js';


(async () => {
  const { update } = await initSimulation();

  let x = 0;

  function step() {
    console.log(update(x));

    x++;

    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
})();
