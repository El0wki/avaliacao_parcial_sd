import FilosofoClass from "./FilosofoClass";
import GarfoClass from "./GarfoClass";

class MesaClass {
  filosofos: FilosofoClass[];
  garfos: GarfoClass[];

  constructor(
    numFilosofos: number,
    FilosofoConstructor: typeof FilosofoClass,
    GarfoConstructor: typeof GarfoClass,
  ) {
    this.garfos = Array.from(
      { length: numFilosofos },
      (_, i) => new GarfoConstructor(`${i + 1}`),
    );
    this.filosofos = Array.from(
      { length: numFilosofos },
      (_, i) => new FilosofoConstructor(`${i + 1}`),
    );

    for (let i = 0; i < numFilosofos; i++) {
      this.filosofos[i].setLeftGarfo(this.garfos[i]);
      this.filosofos[i].setRightGarfo(this.garfos[(i + 1) % numFilosofos]);
    }
  }

  getFilosofos(): FilosofoClass[] {
    return this.filosofos;
  }

  getGarfos(): GarfoClass[] {
    return this.garfos;
  }
}

export default MesaClass;
