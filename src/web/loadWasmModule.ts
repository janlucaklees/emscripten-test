const defaultImports = {
  env: {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
  }
}


export default async function loadWasmModule(
  path: string,
  imports: object = {}
): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
  const response = await fetch(path);
  const wasmBinary = await response.arrayBuffer();

  return await WebAssembly.instantiate(
    wasmBinary,
    Object.assign(
      {},
      defaultImports,
      imports
    )
  );
}
