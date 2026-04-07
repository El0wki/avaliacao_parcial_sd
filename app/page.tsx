"use client";

import { useState } from "react";
import Filosofo from "./Mesa/Filosofo";
import Mesa from "./Mesa/Mesa";

const estadosConfig = {
  comendo: "bg-red-500",
  pensando: "bg-green-500",
  esperando: "bg-yellow-500",
};

const NUM_FILOSOFOS = 5;

export default function Home() {
  const [mesa] = useState(() => new Mesa(NUM_FILOSOFOS));
  const [, setUpdate] = useState(0);

  const filosofos = mesa.getFilosofos();

  const iniciarSimulacao = async () => {
    const acoes = [
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

    for (const acao of acoes) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      acao();
      setUpdate((prev) => prev + 1);
    }
  };

  return (
    <main className="h-screen bg-gray-900 p-8">
      <div className="mb-8">
        <button
          onClick={iniciarSimulacao}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
          Iniciar Simulação
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {filosofos.map((filosofo, idx) => {
          return (
            <div className="flex space-x-2 p-2" key={`${filosofo.id}${idx}`}>
              <span className="p-2 text-white font-bold w-32">
                {filosofo.id}
              </span>
              <span className="p-2 text-white font-bold w-32">
                {filosofo.leftGarfo?.isTaken ? (
                  <div className="bg-white">{filosofo.leftGarfo.id}</div>
                ) : (
                  filosofo.leftGarfo?.id
                )}
              </span>
              <span className="p-2 text-white font-bold w-32">
                {filosofo.rightGarfo?.isTaken ? (
                  <div className="bg-white">{filosofo.rightGarfo.id}</div>
                ) : (
                  filosofo.rightGarfo?.id
                )}
              </span>

              <span
                className={`${estadosConfig[filosofo.estado]} p-2 rounded-sm hover:scale-105 duration-200 text-white font-semibold min-w-[120px] text-center`}>
                {filosofo.estado}
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
