TARGET = src/web/Simulator.js
SRC = src/simulation/*.cpp

.$PHONY: wasm
wasm:
	EMCC_DEBUG=1 emcc -g3 -gsource-map -lembind -std=c++17 -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o $(TARGET) $(SRC)

.$PHONY: start
start: wasm
	yarn start
