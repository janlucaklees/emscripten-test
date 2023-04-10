// quick_example.cpp
#include <emscripten/bind.h>


class Simulator {
  public: Simulator(float increment): increment(increment) {

  }

  float update() {
    rotation = rotation + increment;
    return rotation;
  }

  private:
    float increment;
    float rotation = 0;
};

// Binding code
EMSCRIPTEN_BINDINGS(my_class_example) {
  emscripten::class_<Simulator>("Simulator")
    .constructor<float>()
    .function("update", &Simulator::update)
    ;
}
