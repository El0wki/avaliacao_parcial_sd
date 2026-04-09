import Garfo from "./GarfoClass";

class FilosofoClass {
  leftGarfo?: Garfo;
  rightGarfo?: Garfo;
  estado: EstadosFilosofo;
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
    if (!(this.leftGarfo && this.rightGarfo) || this.estado == "comendo")
      return null;

    if (this.leftGarfo.isTaken || this.rightGarfo.isTaken) {
      this.estado = "esperando";
      return null;
    }

    this.estado = "comendo";
    this.leftGarfo.isTaken = true;
    this.rightGarfo.isTaken = true;
  }

  largar() {
    if (!(this.leftGarfo && this.rightGarfo) || this.estado != "comendo")
      return null;

    this.estado = "pensando";
    this.leftGarfo.isTaken = false;
    this.rightGarfo.isTaken = false;
  }
}

export default FilosofoClass;
