import Semaforo from "../solucoes/Semaforo";
import Garfo from "./Garfo";

class GarfoSemaforo extends Garfo {
  semaforo: Semaforo;

  constructor(id: string) {
    super(id);
    this.semaforo = new Semaforo(1);
  }
}

export default GarfoSemaforo;
