import Filosofo from "../Mesa/FilosofoClass";

export const simularDefault = (filosofos: Filosofo[]) => {
  return [
    () => {
      filosofos[0].comer();
      console.log("Filósofo 0: COMENDO");
    },
    () => {
      filosofos[1].comer();
      console.log("Filósofo 1: TENTANDO COMER (vai ficar esperando)");
    },
    () => {
      filosofos[2].comer();
      console.log("Filósofo 2: COMENDO");
    },
    () => {
      filosofos[0].largar();
      console.log("Filósofo 0: LARGOU");
    },
    () => {
      filosofos[3].comer();
      console.log("Filósofo 3: COMENDO");
    },
    () => {
      filosofos[2].largar();
      console.log("Filósofo 2: LARGOU");
    },
    () => {
      filosofos[1].comer();
      console.log("Filósofo 1: COMENDO (agora consegue!)");
    },
    () => {
      filosofos[4].comer();
      console.log("Filósofo 4: TENTANDO COMER (vai ficar esperando)");
    },
    () => {
      filosofos[3].largar();
      console.log("Filósofo 3: LARGOU");
    },
    () => {
      filosofos[1].largar();
      console.log("Filósofo 1: LARGOU");
    },
  ];
};
