#ifndef PLANET_H
#define PLANET_H

#include "Vector.h"

class Planet {
public:
  Planet(float mass, Vector, Vector);

  float getMass() const;
  float getRadius() const;

  Vector getPosition() const;

  float getX() const;
  float getY() const;
  float getZ() const;

  void applyForce(Vector force);

  void updatePosition();

private:
  int mass;
  Vector position;
  Vector acceleration;
  Vector velocity;
};

#endif // PLANET_H
