"use client";

import React, { useRef, useState, useEffect } from "react";
import SemaforoMesaClass from "../../classes/semaforo/SemaforoMesa";
import SemaforoFilosofo from "./SemaforoFilosofo";
import SemaforoGarfo from "./SemaforoGarfo";

type SemaforoMesaProps = {
  NUM_FILOSOFOS: number;
  duracao?: number;
};

const SemaforoMesa = ({ NUM_FILOSOFOS, duracao = 0 }: SemaforoMesaProps) => {
  const [, setUpdate] = useState({});
  const mesaRef = useRef<SemaforoMesaClass | null>(null);

  if (!mesaRef.current) {
    mesaRef.current = new SemaforoMesaClass(
      NUM_FILOSOFOS,
      () => {
        setUpdate({});
      },
      duracao,
    );
  }

  const mesaClass = mesaRef.current;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (mesaClass.isAtiva()) {
      intervalId = setInterval(() => {
        setUpdate({});
      }, 50);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [mesaClass]);

  const filosofos = mesaClass.getFilosofos();
  const garfos = mesaClass.getGarfos();

  return (
    <div id="semaforo-mesa-container">
      <div className="text-center text-white p-2 text-sm">
        ⏱️ {(mesaClass.getTempoRestante() / 1000).toFixed(1)}s
      </div>

      <div
        id="table"
        className="flex place-content-center place-items-center h-max">
        {Array.from({ length: NUM_FILOSOFOS }, (_, idx) => {
          const filosofo = filosofos[idx];
          const garfo = garfos[idx];
          return (
            <React.Fragment key={idx}>
              <div className="filosofo">
                <SemaforoFilosofo filosofo={filosofo} />
              </div>
              <div className="garfo">
                <SemaforoGarfo garfo={garfo} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SemaforoMesa;
