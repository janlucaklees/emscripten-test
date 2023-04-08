async function initWasm() {
  const response = await fetch('simulation.wasm');
  const wasmBinary = await response.arrayBuffer();
  const wasmModule = await WebAssembly.instantiate(wasmBinary, {
    env: {
      memoryBase: 0,
      tableBase: 0,
      memory: new WebAssembly.Memory({ initial: 256 }),
      table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
    }
  });

  // Get the exports from the WASM module.
  const exports = wasmModule.instance.exports;

  return exports;
}

(async () => {
  const { update } = await initWasm();

  let x = 0;

  function step() {
    console.log(update(x));

    x++;

    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
})();
