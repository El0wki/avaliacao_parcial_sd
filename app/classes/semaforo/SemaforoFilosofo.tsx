import FilosofoClass from "../default/FilosofoClass";
import SemaforoGarfo from "./SemaforoGarfo";

class SemaforoFilosofo extends FilosofoClass {
  async comer(): Promise<boolean> {
    if (!this.leftGarfo || !this.rightGarfo || this.estado === "comendo")
      return false;

    const left = this.leftGarfo as SemaforoGarfo;
    const right = this.rightGarfo as SemaforoGarfo;

    this.estado = "esperando";

    try {
      await left.pegar();
    } catch {
      this.estado = "pensando";
      return false;
    }

    try {
      await right.pegar();
    } catch {
      await left.largar();
      this.estado = "pensando";
      return false;
    }

    this.estado = "comendo";
    return true;
  }

  async comerInvertido(): Promise<boolean> {
    if (!this.leftGarfo || !this.rightGarfo || this.estado === "comendo")
      return false;

    const left = this.leftGarfo as SemaforoGarfo;
    const right = this.rightGarfo as SemaforoGarfo;

    this.estado = "esperando";

    try {
      await right.pegar();
    } catch {
      this.estado = "pensando";
      return false;
    }

    try {
      await left.pegar();
    } catch {
      await right.largar();
      this.estado = "pensando";
      return false;
    }

    this.estado = "comendo";
    return true;
  }

  async largar(): Promise<void> {
    if (!this.leftGarfo || !this.rightGarfo || this.estado !== "comendo")
      return;

    const left = this.leftGarfo as SemaforoGarfo;
    const right = this.rightGarfo as SemaforoGarfo;

    await left.largar();
    await right.largar();
    this.estado = "pensando";
  }
}

export default SemaforoFilosofo;
