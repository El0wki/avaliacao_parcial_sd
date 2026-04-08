class Semaforo {
  private contador: number;
  private fila: (() => void)[];

  constructor(valor: number) {
    this.contador = valor;
    this.fila = [];
  }

  acquire(): Promise<void> {
    if (this.contador > 0) {
      this.contador--;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.fila.push(resolve);
    });
  }

  release(): void {
    if (this.fila.length > 0) {
      const proximo = this.fila.shift();
      proximo!();
    } else {
      this.contador++;
    }
  }
}

export default Semaforo;
