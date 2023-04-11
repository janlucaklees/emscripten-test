#include "Vector.h"
#include <cmath>
#include <emscripten/bind.h>

Vector::Vector(float x, float y, float z) : x(x), y(y), z(z) {}

float Vector::getX() const { return x; }
float Vector::getY() const { return y; }
float Vector::getZ() const { return z; }

Vector Vector::operator+(const Vector &other) const {
  return Vector(x + other.x, y + other.y, z + other.z);
}

Vector Vector::operator-(const Vector &other) const {
  return Vector(x - other.x, y - other.y, z - other.z);
}

Vector Vector::operator*(float scalar) const {
  return Vector(x * scalar, y * scalar, z * scalar);
}

Vector Vector::operator/(float scalar) const {
  return Vector(x / scalar, y / scalar, z / scalar);
}

float Vector::magnitudeSquared() const {
  return std::pow(x, 2) + std::pow(y, 2) + std::pow(z, 2);
}

float Vector::magnitude() const {
  return std::sqrt(magnitudeSquared());
}

Vector Vector::normalize() const {
  float m = magnitude();
  return Vector(x / m, y / m, z / m);
}

// Binding code
EMSCRIPTEN_BINDINGS(vector) {
  emscripten::class_<Vector>("Vector")
    .constructor<float, float, float>()
    .property("x", &Vector::getX)
    .property("y", &Vector::getY)
    .property("z", &Vector::getZ)
    ;
};
