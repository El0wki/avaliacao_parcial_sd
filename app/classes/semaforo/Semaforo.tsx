class Semaforo {
  private contador: number;
  private fila: (() => void)[] = [];

  constructor(valor: number) {
    this.contador = valor;
  }

  async acquire(): Promise<void> {
    if (this.contador > 0) {
      this.contador--;
      return;
    }
    await new Promise<void>((resolve) => this.fila.push(resolve));
  }

  release(): void {
    if (this.fila.length > 0) {
      const next = this.fila.shift();
      if (next) next();
    } else {
      this.contador++;
    }
  }
}

export default Semaforo;
