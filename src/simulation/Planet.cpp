#include "Planet.h"
#include "Vector.h"
#include <emscripten/bind.h>
#include <math.h>

Planet::Planet(float mass, Vector position, Vector velocity) :
  mass(mass),
  position(position),
  acceleration(Vector(0, 0, 0)),
  velocity(velocity)
{}

float Planet::getMass() const { return mass; }
float Planet::getRadius() const { return 3.0f * mass / 4.0f * M_PI; }

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
      .constructor<float, Vector, Vector>()
      .property("mass", &Planet::getMass)
      .property("radius", &Planet::getRadius)
      .property("x", &Planet::getX)
      .property("y", &Planet::getY)
      .property("z", &Planet::getZ);
};
