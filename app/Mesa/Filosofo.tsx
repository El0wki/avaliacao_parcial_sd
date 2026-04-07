import Garfo from "./Garfo";

type Estados = "pensando" | "comendo" | "esperando";

class Filosofo {
  leftGarfo?: Garfo;
  rightGarfo?: Garfo;
  estado: Estados;
  id: string;

  constructor(id: string) {
    this.id = `Filósofo ${id}`;
    this.estado = "pensando";
  }

  setLeftGarfo(garfo: Garfo) {
    this.leftGarfo = garfo;
  }

  setRightGarfo(garfo: Garfo) {
    this.rightGarfo = garfo;
  }

  comer() {
    if (!(this.leftGarfo && this.rightGarfo)) return null;
    if (this.leftGarfo.isTaken || this.rightGarfo.isTaken) {
      this.estado = "esperando";
      return null;
    }
    if (this.estado == "comendo") return null;

    this.estado = "comendo";
    this.leftGarfo.isTaken = true;
    this.rightGarfo.isTaken = true;
  }

  largar() {
    if (!(this.leftGarfo && this.rightGarfo)) return null;
    if (this.estado != "comendo") return null;

    this.estado = "pensando";
    this.leftGarfo.isTaken = false;
    this.rightGarfo.isTaken = false;
  }
}

export default Filosofo;
