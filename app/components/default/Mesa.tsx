"use client";

import React, { useMemo } from "react";
import MesaClass from "../../classes/default/MesaClass";
import FilosofoClass from "../../classes/default/FilosofoClass";
import GarfoClass from "../../classes/default/GarfoClass";
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
    <div
      id="table"
      className="flex place-content-center place-items-center h-max">
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
    </div>
  );
};

export default Mesa;
