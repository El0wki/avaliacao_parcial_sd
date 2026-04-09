"use client";

import React, { useRef, useState, useEffect } from "react";
import MonitorMesaClass from "../../classes/monitor/MonitorMesa";
import MonitorFilosofo from "./MonitorFilosofo";
import MonitorGarfo from "./MonitorGarfo";

type MonitorMesaProps = {
  NUM_FILOSOFOS: number;
  duracao?: number;
};

const MonitorMesa = ({ NUM_FILOSOFOS, duracao = 0 }: MonitorMesaProps) => {
  const [, setUpdate] = useState({});
  const mesaRef = useRef<MonitorMesaClass | null>(null);

  if (!mesaRef.current) {
    mesaRef.current = new MonitorMesaClass(
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
    <div id="monitor-mesa-container">
      <div className="text-center text-white p-2 text-sm">
        ⏱️ {(mesaClass.getTempoRestante() / 1000).toFixed(1)}s
      </div>

      <div
        id="table"
        className="flex place-content-center place-items-center h-max">
        {Array.from({ length: NUM_FILOSOFOS }, (_, idx) => {
          const filosofo = filosofos[idx] as any;
          const garfo = garfos[idx] as any;
          return (
            <React.Fragment key={idx}>
              <div className="filosofo">
                <MonitorFilosofo filosofo={filosofo} />
              </div>
              <div className="garfo">
                <MonitorGarfo garfo={garfo} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MonitorMesa;
