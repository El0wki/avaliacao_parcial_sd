"use client";

import { useEffect, useState } from "react";
import GarfoClass from "../mesa/Garfo";

type GarfoComponent = {
  garfo: GarfoClass;
};

const Garfo = ({ garfo }: GarfoComponent) => {
  const [_, update] = useState(0);
  useEffect(() => {}, [garfo.isTaken]);
  return (
    <div
      className={`h-25 w-25  rounded-full flex items-center justify-center ${garfo.isTaken ? "bg-red-500" : "bg-green-500"}`}>
      {garfo.id}
    </div>
  );
};

export default Garfo;
