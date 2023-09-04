TARGET = src/web/Simulator.js
SRC = 2DTissue/src/*/**.cpp

.$PHONY: build
build:
	git submodule init
	git submodule update
	(mkdir -p ./gmp && cd ./gmp && hg update) || hg clone https://gmplib.org/repo/gmp/
	docker build --progress=plain .

# .$PHONY: start
# start:
# 	EMCC_DEBUG=1 emcc -g3 -gsource-map -lembind -std=c++17 -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o $(TARGET) $(SRC)
# 	yarn start

# .$PHONY: build
# build:
# 	emcc -O3 -lembind -std=c++17 -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o $(TARGET) $(SRC)
# 	yarn build
