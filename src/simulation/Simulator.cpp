#include "Simulator.h"
#include "Planet.h"
#include <cstdlib>
#include <ctime>
#include <emscripten/bind.h>
#include <emscripten/val.h>

Simulator::Simulator(int numPlanets) {
  srand(static_cast<unsigned int>(time(0))); // Seed random number generator

  for (int i = 0; i < numPlanets; ++i) {
    float x = getRandomCoordinate();
    float y = getRandomCoordinate();
    planets.push_back(Planet(x, y));
  }
}

Planet &Simulator::getPlanet(int index) { return planets[index]; }

std::vector<Planet> &Simulator::getPlanets() { return planets; }

std::vector<Planet> &Simulator::update() {

  for (Planet &planet : planets) {
    planet.setX(planet.getX() + 0.2);
    planet.setY(planet.getY() + 0.2);
  }

  return planets;
}

float Simulator::getRandomCoordinate() {
  const float minCoord = -50.0;
  const float maxCoord = 50.0;
  return minCoord + static_cast<float>(rand()) /
                        (static_cast<float>(RAND_MAX / (maxCoord - minCoord)));
}

// Binding code
EMSCRIPTEN_BINDINGS(simulator) {
  emscripten::class_<Simulator>("Simulator")
    .constructor<int>()
    .function("getPlanet", &Simulator::getPlanet)
    .function("getPlanets", &Simulator::getPlanets)
    .function("update", &Simulator::update);

  emscripten::register_vector<Planet>("VectorPlanet");
};
