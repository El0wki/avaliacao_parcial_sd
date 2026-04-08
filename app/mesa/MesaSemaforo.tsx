import FilosofoSemaforo from "./FilosofoSemaforo";
import GarfoSemaforo from "./GarfoSemaforo";
import Mesa from "./Mesa";

class MesaSemaforo extends Mesa {
  constructor(numFilosofos: number) {
    super(numFilosofos);

    this.garfos = Array.from(
      { length: numFilosofos },
      (_, i) => new GarfoSemaforo(`${i + 1}`),
    );

    this.filosofos = Array.from(
      { length: numFilosofos },
      (_, i) => new FilosofoSemaforo(`${i + 1}`),
    );

    for (let i = 0; i < numFilosofos; i++) {
      this.filosofos[i].setLeftGarfo(this.garfos[i]);
      this.filosofos[i].setRightGarfo(this.garfos[(i + 1) % numFilosofos]);
    }
  }

  iniciar(): void {
    this.filosofos.forEach((f) => (f as FilosofoSemaforo).ciclo());
  }
}

export default MesaSemaforo;
