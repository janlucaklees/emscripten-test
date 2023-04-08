TARGET = src/web/simulation.wasm
SRC = src/simulation/simulation.c

.$PHONY: wasm
wasm:
	emcc $(SRC) -O3 -s WASM=1 -s SIDE_MODULE=1 -o $(TARGET)

.$PHONY: start
start: wasm
	yarn start
