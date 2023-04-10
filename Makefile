TARGET = src/web/simulator.js
SRC = src/simulation/simulator.cpp

.$PHONY: wasm
wasm:
	emcc -lembind -std=c++14 -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o $(TARGET) $(SRC)

.$PHONY: start
start: wasm
	yarn start
