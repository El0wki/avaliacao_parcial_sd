import GarfoClass from "../default/GarfoClass";
import Semaforo from "./Semaforo";

class SemaforoGarfo extends GarfoClass {
  private semaforo: Semaforo;

  constructor(id: string) {
    super(id);
    this.semaforo = new Semaforo(1);
  }

  async pegar(): Promise<void> {
    await this.semaforo.acquire();
    this.isTaken = true;
  }

  async largar(): Promise<void> {
    this.isTaken = false;
    this.semaforo.release();
  }
}

export default SemaforoGarfo;
