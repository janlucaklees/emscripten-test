#include "Planet.h"
#include <emscripten/bind.h>

Planet::Planet(float x, float y) : x(x), y(y) {}

float Planet::getX() const { return x; }

float Planet::getY() const { return y; }

void Planet::setX(float value) { x = value; }

void Planet::setY(float value) { y = value; }

// Binding code
EMSCRIPTEN_BINDINGS(planet) {
  emscripten::class_<Planet>("Planet")
    .constructor<float, float>()
    .property("x", &Planet::getX, &Planet::setX)
    .property("y", &Planet::getY, &Planet::setY);
};
