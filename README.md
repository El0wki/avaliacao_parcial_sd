# Filósofos Jantando - Semáforos vs Monitores

Implementação e comparação do problema dos Filósofos Jantando com duas abordagens de sincronização.

## O Problema

5 filósofos sentam pra comer. Cada um precisa de 2 garfos (esquerdo e direito). Se não tiver os dois, pensa.

Desafios: deadlock, starvation, garfos órfãos.

## Implementações

**Default** - Sem sincronização (mostra o problema)

**Semáforo** - Cada garfo é um semáforo. Filósofo 5 inverte a ordem de aquisição pra quebrar deadlock.

**Monitor** - Lock centralizado. Um filósofo por vez.

## Como Resolve

| Abordagem    | Deadlock                                  | Starvation                  |
| ------------ | ----------------------------------------- | --------------------------- |
| **Default**  | Trava (todos pegam esq, esperam dir)      | Alguns nunca comem          |
| **Semáforo** | Filósofo 5 inverte (dir→esq) quebra ciclo | FIFO queue garante justiça  |
| **Monitor**  | Impossível (só um comendo por vez)        | FIFO queue serializa turnos |

## Qual é melhor?

**Monitor.** Mais seguro, automático, impossível errar. Semáforo funciona mas você precisa ser muito cuidadoso.

## Rodando

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000` com 3 colunas lado a lado mostrando todas as abordagens rodando.
