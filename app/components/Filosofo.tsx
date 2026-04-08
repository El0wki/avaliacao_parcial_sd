"use client";

import { useState } from "react";
import FilosofoClass from "../Mesa/FilosofoClass";
import { useMesaStore } from "./store";
import { estadosFilosofosConfig } from "./config";

type FilosofoComponent = {
  filosofo: FilosofoClass;
};

const Filosofo = ({ filosofo }: FilosofoComponent) => {
  const [, forceUpdate] = useState({});

  const handleComer = () => {
    forceUpdate({});
    if (filosofo.estado == "comendo") {
      filosofo.largar();
      return;
    }
    filosofo.comer();
  };

  return (
    <button
      className={`h-25 w-25 rounded-full flex items-center justify-center ${estadosFilosofosConfig[filosofo.estado]} hover:scale-105 duration-200 cursor-pointer`}
      onClick={handleComer}>
      {filosofo.id}
    </button>
  );
};

export default Filosofo;
