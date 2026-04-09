"use client";

import { useEffect, useState } from "react";
import MonitorFilosofoClass from "../../classes/monitor/MonitorFilosofo";

import { estadosFilosofosConfig } from "../config";

type MonitorFilosofoProps = {
  filosofo: MonitorFilosofoClass;
};

export default function MonitorFilosofo({ filosofo }: MonitorFilosofoProps) {
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
}
