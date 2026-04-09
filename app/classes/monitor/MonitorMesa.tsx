import MesaClass from "../default/MesaClass";
import MonitorFilosofo from "./MonitorFilosofo";
import MonitorGarfo from "./MonitorGarfo";
import Monitor from "./Monitor";

class MonitorMesaClass extends MesaClass {
  private updateCallback?: () => void;
  private tempoInicio: number = 0;
  private duracao: number;
  private ativa: boolean = false;
  private monitor: Monitor = new Monitor();

  constructor(
    numFilosofos: number,
    updateCallback?: () => void,
    duracao: number = 0,
  ) {
    super(numFilosofos, MonitorFilosofo, MonitorGarfo);
    this.updateCallback = updateCallback;
    this.duracao = duracao;
    this.iniciarSimulacao();
  }

  private iniciarSimulacao(): void {
    this.ativa = true;

    setTimeout(() => {
      this.tempoInicio = Date.now();
      this.filosofos.forEach((filosofo, index) => {
        this.executarFilosofo(filosofo as MonitorFilosofo, index);
      });
    }, 2000);
  }

  private async executarFilosofo(
    filosofo: MonitorFilosofo,
    index: number,
  ): Promise<void> {
    while (this.ativa) {
      if (this.duracao > 0) {
        const tempoDecorrido = Date.now() - this.tempoInicio;
        if (tempoDecorrido >= this.duracao) {
          this.ativa = false;
          break;
        }
      }

      await this.monitor.enter();
      try {
        const conseguiu = await filosofo.comer();
        this.notifyUpdate();

        if (conseguiu) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          await filosofo.largar();
          this.notifyUpdate();
        }
      } catch (error) {
        // erro silencioso
      } finally {
        this.monitor.exit();
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );
    }
  }

  private notifyUpdate(): void {
    if (this.updateCallback) {
      this.updateCallback();
    }
  }

  isAtiva(): boolean {
    return this.ativa;
  }

  getTempoRestante(): number {
    if (this.duracao === 0) return -1;
    return Math.max(0, this.duracao - (Date.now() - this.tempoInicio));
  }
}

export default MonitorMesaClass;
