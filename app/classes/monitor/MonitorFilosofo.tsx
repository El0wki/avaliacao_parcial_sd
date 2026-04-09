import FilosofoClass from "../default/FilosofoClass";

class MonitorFilosofo extends FilosofoClass {
  async comer(): Promise<boolean> {
    if (!(this.leftGarfo && this.rightGarfo) || this.estado === "comendo")
      return false;

    if (this.leftGarfo.isTaken || this.rightGarfo.isTaken) {
      this.estado = "esperando";
      return false;
    }

    this.estado = "comendo";
    this.leftGarfo.isTaken = true;
    this.rightGarfo.isTaken = true;
    return true;
  }

  async largar(): Promise<void> {
    if (!(this.leftGarfo && this.rightGarfo) || this.estado !== "comendo")
      return;

    this.estado = "pensando";
    this.leftGarfo.isTaken = false;
    this.rightGarfo.isTaken = false;
  }
}

export default MonitorFilosofo;
