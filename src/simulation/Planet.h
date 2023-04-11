#ifndef PLANET_H
#define PLANET_H

class Planet {
public:
  Planet(float x, float y);

  float getX() const;
  float getY() const;

  void setX(float value);
  void setY(float value);

private:
  float x;
  float y;
};

#endif // PLANET_H
