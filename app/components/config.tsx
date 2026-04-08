export const estadosFilosofosConfig: Record<EstadosFilosofo, string> = {
  comendo: "bg-red-500",
  pensando: "bg-blue-500",
  esperando: "bg-yellow-500",
};

export const estadosGarfosConfig: Record<"true" | "false", string> = {
  true: "bg-red-500",
  false: "bg-green-500",
} as const;
