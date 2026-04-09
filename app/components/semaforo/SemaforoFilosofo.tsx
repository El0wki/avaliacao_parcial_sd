"use client";

import { useState, useEffect } from "react";
import SemaforoFilosofoClass from "../../classes/semaforo/SemaforoFilosofo";
import { estadosFilosofosConfig } from "../config";

type SemaforoFilosofoProps = {
  filosofo: SemaforoFilosofoClass;
};

const SemaforoFilosofo = ({ filosofo }: SemaforoFilosofoProps) => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 500);

    return () => clearInterval(interval);
  }, [filosofo]);

  return (
    <div
      className={`h-25 w-25 rounded-full flex items-center justify-center ${estadosFilosofosConfig[filosofo.estado]} hover:scale-105 duration-200`}>
      {filosofo.id}
    </div>
  );
};

export default SemaforoFilosofo;
