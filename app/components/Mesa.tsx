"use client";

import React, { useMemo } from "react";
import MesaClass from "../Mesa/MesaClass";
import FilosofoClass from "../Mesa/FilosofoClass";
import GarfoClass from "../Mesa/GarfoClass";
import Filosofo from "./Filosofo";
import Garfo from "./Garfo";

type MesaComponent = {
  NUM_FILOSOFOS: number;
};

const Mesa = ({ NUM_FILOSOFOS }: MesaComponent) => {
  const mesaClass = useMemo(
    () => new MesaClass(NUM_FILOSOFOS, FilosofoClass, GarfoClass),
    [NUM_FILOSOFOS],
  );

  const filosofos = mesaClass.getFilosofos();
  const garfos = mesaClass.getGarfos();

  return (
    <>
      {Array.from({ length: NUM_FILOSOFOS }, (_, idx) => {
        const filosofo = filosofos[idx];
        const garfo = garfos[idx];
        return (
          <React.Fragment key={idx}>
            <div className="filosofo">
              <Filosofo filosofo={filosofo} />
            </div>
            <div className="garfo">
              <Garfo garfo={garfo} />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Mesa;
