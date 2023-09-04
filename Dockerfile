FROM emscripten/emsdk:3.1.44

RUN apt update
RUN apt install -y libboost-all-dev libeigen3-dev libgmp-dev libmpfr-dev libgtest-dev libomp-dev libassimp-dev libsundials-dev

# Setting some variables
ARG BASE_DIR=/usr/src/lucii
ARG BUILD_DIR=/usr/src/lucii/build

# Copying the most basic files over
WORKDIR ${BASE_DIR}
COPY .gitmodules ${BASE_DIR}
COPY .git ${BASE_DIR}/.git
RUN ls -la ${BASE_DIR}/

# Compile CGAL to wasm
COPY ./cgal ${BASE_DIR}/cgal
WORKDIR ${BUILD_DIR}/cgal
RUN emcmake cmake ${BASE_DIR}/cgal/ -DCMAKE_BUILD_TYPE=Release -DCGAL_HEADER_ONLY=OFF
RUN make
RUN make install

# Compile assimp to wasm
COPY ./assimp ${BASE_DIR}/assimp
WORKDIR ${BUILD_DIR}/assimp
RUN emcmake cmake ${BASE_DIR}/assimp/
RUN make
RUN make install

# Compile gmp to wasm
COPY ./gmp ${BASE_DIR}/gmp
WORKDIR ${BUILD_DIR}/gmp
RUN emcmake cmake ${BASE_DIR}/gmp/
RUN make
RUN make install

# Compiling our own Code
COPY ./2DTissue ${BASE_DIR}/2DTissue
WORKDIR ${BUILD_DIR}/2DTissue
RUN ln -s /usr/include/eigen3 /emsdk/upstream/emscripten/system/include/eigen3
RUN emcmake cmake ${BASE_DIR}/2DTissue/
RUN make
RUN make install

# RUN emcc -O3 -lembind -std=c++17 -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT='web' -s EXPORT_ES6=1 -o /usr/src/web/Simulator.js /usr/src/2DTissue/src/*/**.cpp
