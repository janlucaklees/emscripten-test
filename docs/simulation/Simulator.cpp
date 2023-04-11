#include "Simulator.h"
#include "Planet.h"
#include "Vector.h"
#include <cstdlib>
#include <ctime>
#include <emscripten/bind.h>
#include <emscripten/val.h>

Simulator::Simulator(
  int numberOfPlanets,
  float g,
  float minMass,
  float maxMass,
  float distributionRange,
  float initialVelocityScalar
):
  numberOfPlanets(numberOfPlanets),
  g(g),
  minMass(minMass),
  maxMass(maxMass),
  distributionRange(distributionRange),
  initialVelocityScalar(initialVelocityScalar)
{
  createPlanets();
}

void Simulator::createPlanets() {
  srand(static_cast<unsigned int>(time(0))); // Seed random number generator

  for (int i = 0; i < numberOfPlanets; ++i) {
    planets.push_back(Planet(
      getRandomMass(),
      Vector(
        getRandomCoordinate(),
        getRandomCoordinate(),
        getRandomCoordinate()
      ),
      Vector(
        getRandomCoordinate(),
        getRandomCoordinate(),
        getRandomCoordinate()
      ).normalize() * initialVelocityScalar
    ));
  }
}

std::vector<Planet> &Simulator::getPlanets() { return planets; }

std::vector<Planet> &Simulator::update() {
  for (int i = 0; i < numberOfPlanets ; i++) {
    Planet &planetA = planets.at(i);

    for (int j = i + 1; j < numberOfPlanets; j++) {
      Planet &planetB = planets.at(j);

      planetA.applyForce(calculateForceVector(planetB, planetA));
      planetB.applyForce(calculateForceVector(planetA, planetB));
    }

    planetA.updatePosition();
  }

  return planets;
}

Vector Simulator::calculateForceVector(Planet planetA, Planet planetB) {
  Vector forceVector = planetA.getPosition() - planetB.getPosition();

  float distance = forceVector.magnitude();
  float minDistance = planetA.getRadius() + planetB.getRadius();
  distance = std::max(distance, minDistance);

  float force =
      (g * planetA.getMass() * planetB.getMass()) / (distance * distance);

  return forceVector.normalize() * force;
}

float Simulator::getRandomCoordinate() {
  const float minCoord = -distributionRange / 2;
  const float maxCoord = distributionRange / 2;
  return minCoord + static_cast<float>(rand()) /
                        (static_cast<float>(RAND_MAX / (maxCoord - minCoord)));
}

float Simulator::getRandomMass() {
  return minMass + static_cast<float>(rand()) /
                       (static_cast<float>(RAND_MAX / (maxMass - minMass)));
}

// Binding code
EMSCRIPTEN_BINDINGS(simulator) {
  emscripten::class_<Simulator>("Simulator")
    .constructor<int, float, float, float, float, float>()
    .function("getPlanets", &Simulator::getPlanets)
    .function("update", &Simulator::update);

  emscripten::register_vector<Planet>("VectorPlanet");
};
