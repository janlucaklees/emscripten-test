#ifndef SOLAR_SYSTEM_H
#define SOLAR_SYSTEM_H

#include "Planet.h"
#include <vector>

class Simulator {
public:
  Simulator(
    int numPlanets,
    float g,
    float minMass,
    float maxMass,
    float distributionRange,
    float initialVelocityScalar
  );

  std::vector<Planet> &getPlanets();

  std::vector<Planet> &update();

private:
  int numberOfPlanets;
  float g;
  float minMass;
  float maxMass;
  float distributionRange;
  float initialVelocityScalar;

  std::vector<Planet> planets;

  void createPlanets();
  Vector calculateForceVector(Planet planetA, Planet planetB);
  float getRandomCoordinate();
  float getRandomMass();
};

#endif // SOLAR_SYSTEM_H
