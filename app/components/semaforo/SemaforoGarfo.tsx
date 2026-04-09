"use client";

import { useState, useEffect } from "react";
import SemaforoGarfoClass from "../../classes/semaforo/SemaforoGarfo";
import { estadosGarfosConfig } from "../config";

type SemaforoGarfoProps = {
  garfo: SemaforoGarfoClass;
};

const SemaforoGarfo = ({ garfo }: SemaforoGarfoProps) => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 200);

    return () => clearInterval(interval);
  }, [garfo]);

  return (
    <div
      className={`h-20 w-20 rounded-full flex items-center justify-center ${
        estadosGarfosConfig[String(garfo.isTaken)]
      }`}>
      {garfo.id}
    </div>
  );
};

export default SemaforoGarfo;
