#include "Planet.h"
#include "Vector.h"
#include <emscripten/bind.h>

Planet::Planet(float mass, float x, float y, float z) :
  mass(mass),
  position(Vector(x, y, z)),
  acceleration(Vector(0, 0, 0)),
  velocity(Vector(0, 0, 0))
{}

float Planet::getMass() const { return mass; }

Vector Planet::getPosition() const { return position; }

float Planet::getX() const { return position.x; }
float Planet::getY() const { return position.y; }
float Planet::getZ() const { return position.z; }

void Planet::applyForce(Vector force) {
  acceleration = acceleration + ( force / mass );
}

void Planet::updatePosition() {
  velocity = velocity + acceleration;
  position = position + velocity;

  acceleration = Vector(0, 0, 0);
}

// Binding code
EMSCRIPTEN_BINDINGS(planet) {
  emscripten::class_<Planet>("Planet")
      .constructor<float, float, float, float>()
      .property("mass", &Planet::getMass)
      .property("x", &Planet::getX)
      .property("y", &Planet::getY)
      .property("z", &Planet::getZ);
};
