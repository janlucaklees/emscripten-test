TARGET = src/web/Simulator.js
SRC = src/simulation/Simulator.cpp src/simulation/Planet.cpp

.$PHONY: wasm
wasm:
	emcc -lembind -std=c++17 -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o $(TARGET) $(SRC)

.$PHONY: start
start: wasm
	yarn start
