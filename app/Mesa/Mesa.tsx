import Filosofo from "./Filosofo";
import Garfo from "./Garfo";

class Mesa {
  filosofos: Filosofo[];
  garfos: Garfo[];

  constructor(numFilosofos: number) {
    this.garfos = Array.from(
      { length: numFilosofos },
      (_, i) => new Garfo(`${i + 1}`),
    );
    this.filosofos = Array.from(
      { length: numFilosofos },
      (_, i) => new Filosofo(`${i + 1}`),
    );

    for (let i = 0; i < numFilosofos; i++) {
      this.filosofos[i].setLeftGarfo(this.garfos[i]);
      this.filosofos[i].setRightGarfo(this.garfos[(i + 1) % numFilosofos]);
    }
  }

  getFilosofos(): Filosofo[] {
    return this.filosofos;
  }

 
}

export default Mesa;
