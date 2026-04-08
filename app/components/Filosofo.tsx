"use client";

import { useState } from "react";
import FilosofoClass from "../mesa/Filosofo";

type FilosofoComponent = {
  filosofo: FilosofoClass;
};

const estadosConfig = {
  comendo: "bg-red-500",
  pensando: "bg-blue-500",
  esperando: "bg-yellow-500",
};

const Filosofo = ({ filosofo }: FilosofoComponent) => {
  const [_, at] = useState(0);
  return (
    <button
      className={`h-25 w-25 rounded-full flex items-center justify-center ${estadosConfig[filosofo.estado]} hover:scale-105 duration-200 cursor-pointer`}
      onClick={() => {
        console.log("click");
        at((val) => val + 1);
        filosofo.comer();
      }}>
      {filosofo.id}
    </button>
  );
};

export default Filosofo;
