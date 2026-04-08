"use client";

import { useState } from "react";
import Filosofo from "./components/Filosofo";
import Garfo from "./components/Garfo";
import MesaSemaforo from "./mesa/MesaSemaforo";

const NUM_FILOSOFOS = 5;

export default function Home() {
  const [mesa] = useState(() => new MesaSemaforo(NUM_FILOSOFOS));
  const [, setUpdate] = useState(0);

  const filosofos = mesa.getFilosofos();
  const garfos = mesa.getGarfos();

  return (
    <main className="h-screen bg-gray-900">
      <div
        id="table"
        className="flex place-content-center place-items-center h-screen">
        {Array.from({ length: NUM_FILOSOFOS }, (_, idx) => {
          const filosofo = filosofos[idx];
          const garfo = garfos[idx];
          return (
            <>
              <div className={`filosofo`} key={idx}>
                <Filosofo filosofo={filosofo} />
              </div>
              <div className={`garfo`}>
                <Garfo garfo={garfo} />
              </div>
            </>
          );
        })}
      </div>
    </main>
  );
}
