#ifndef VECTOR_H
#define VECTOR_H

class Vector {
public:
  float x, y, z;

  Vector(float x, float y, float z);

  float getX() const;
  float getY() const;
  float getZ() const;

  // Addition
  Vector operator+(const Vector &other) const;

  // Subtraction
  Vector operator-(const Vector &other) const;

  // Scalar multiplication
  Vector operator*(float scalar) const;

  // Scalar division
  Vector operator/(float scalar) const;

  // Get the square of the length of the vector
  float magnitudeSquared() const;

  // Get the length of the vector
  float magnitude() const;

  Vector normalize() const;
};

#endif // VECTOR_H
