import Filosofo from "./Filosofo";
import GarfoSemaforo from "./GarfoSemaforo";

class FilosofoSemaforo extends Filosofo {
  constructor(id: string) {
    super(id);
  }

  private esperar(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private tempoAleatorio(): number {
    return Math.random() * 2000 + 500; // entre 500ms e 2500ms
  }

  async ciclo(): Promise<void> {
    while (true) {
      // Pensando
      this.estado = "pensando";
      await this.esperar(this.tempoAleatorio());

      // Tentando comer
      this.estado = "esperando";
      await this.comer();

      // Comendo
      await this.esperar(this.tempoAleatorio());

      // Largando
      this.largar();
    }
  }

  async comer() {
    const left = this.leftGarfo as GarfoSemaforo;
    const right = this.rightGarfo as GarfoSemaforo;

    this.estado = "esperando";
    await left.semaforo.acquire();
    await right.semaforo.acquire();

    this.estado = "comendo";
    left.isTaken = true;
    right.isTaken = true;
    if (this.id === "Filósofo 5") {
      await right.semaforo.acquire();
      await left.semaforo.acquire();
    } else {
      await left.semaforo.acquire();
      await right.semaforo.acquire();
    }
    return null;
  }

  largar() {
    const left = this.leftGarfo as GarfoSemaforo;
    const right = this.rightGarfo as GarfoSemaforo;

    this.estado = "pensando";
    left.isTaken = false;
    right.isTaken = false;
    left.semaforo.release();
    right.semaforo.release();
    return null;
  }
}

export default FilosofoSemaforo;
