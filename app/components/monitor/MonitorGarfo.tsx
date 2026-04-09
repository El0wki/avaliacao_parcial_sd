"use client";

import { useEffect, useState } from "react";
import MonitorGarfoClass from "../../classes/monitor/MonitorGarfo";
import { estadosGarfosConfig } from "../config";

type MonitorGarfoProps = {
  garfo: MonitorGarfoClass;
};

export default function MonitorGarfo({ garfo }: MonitorGarfoProps) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 200);

    return () => clearInterval(interval);
  }, [garfo]);

  return (
    <div
      className={`h-20 w-20 rounded-full flex items-center justify-center ${estadosGarfosConfig[garfo.isTaken ? "true" : "false"]}`}>
      {garfo.id}
    </div>
  );
}
