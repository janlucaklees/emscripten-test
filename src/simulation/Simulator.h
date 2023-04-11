#ifndef SOLAR_SYSTEM_H
#define SOLAR_SYSTEM_H

#include "Planet.h"
#include <vector>

class Simulator {
public:
  Simulator(int numPlanets);

  Planet &getPlanet(int index);
  std::vector<Planet> &getPlanets();

  std::vector<Planet> &update();

private:
  std::vector<Planet> planets;
  float getRandomCoordinate();
};

#endif // SOLAR_SYSTEM_H
