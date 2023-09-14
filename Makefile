TARGET = src/web/Simulator.js
SRC = src/simulation/*.cpp


.$PHONY: start
start:
	EMCC_DEBUG=1 emcc -g3 -gsource-map -lembind -std=c++20 -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o $(TARGET) $(SRC)
	yarn start

.$PHONY: build
build:
	emcc -O3 -lembind -std=c++20 -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o $(TARGET) $(SRC)
	yarn build
