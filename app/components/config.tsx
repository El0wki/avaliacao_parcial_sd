export const estadosFilosofosConfig: Record<EstadosFilosofo, string> = {
  pensando: "bg-green-500",
  comendo: "bg-red-500",
  esperando: "bg-yellow-500",
};

export const estadosGarfosConfig: Record<"true" | "false", string> = {
  true: "bg-red-500",
  false: "bg-green-500",
} as const;
