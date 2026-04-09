This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Problema dos Filósofos Jantando - Comparação de Sincronização

Implementação e comparação de **três abordagens** para resolver o clássico problema dos Filósofos Jantando:

1. **Default** - Sem sincronização
2. **Semáforos** - Sincronização com semáforos e Promise.race()
3. **Monitores** - Padrão Monitor com condition variables

## 🍽️ O Problema

5 filósofos sentam em uma mesa redonda. Entre cada dois filósofos há um garfo. Um filósofo precisa de **AMBOS os garfos** (esquerdo e direito) para comer. Caso contrário, pensa.

**Desafios:**

- 🔴 **Deadlock**: Todos pegam o garfo esquerdo e ficam esperando o direito eternamente
- 🟡 **Starvation**: Alguns filósofos nunca conseguem comer
- ⚫ **Garfos Órfãos**: Um garfo fica marcado como ocupado mas ninguém o possui

## 🏗️ Estrutura do Projeto

```
app/
├── classes/
│   ├── default/           # Abordagem sem sincronização
│   ├── semaforo/          # Implementação com semáforos
│   └── monitor/           # Implementação com monitores
├── components/
│   ├── default/           # Componentes visuais padrão
│   ├── semaforo/          # Componentes visuais (semáforos)
│   └── monitor/           # Componentes visuais (monitores)
└── page.tsx              # 3 colunas lado a lado
```

## 📊 Implementações

### **1. Default (Sem Sincronização)**

```typescript
// Abordagem ingênua - apenas verifica se garfos estão livres
if (leftGarfo.isTaken || rightGarfo.isTaken) {
  this.estado = "esperando";
  return null;
}
this.estado = "comendo";
leftGarfo.isTaken = true;
rightGarfo.isTaken = true;
```

**Problemas:** Race condition, garfos órfãos, deadlock

---

### **2. Semáforos (Promise.race + Timeout)**

**Semáforo.tsx:**

```typescript
class Semaforo {
  private contador: number;
  private fila: (() => void)[];

  async acquire(): Promise<void> {
    if (this.contador > 0) {
      this.contador--;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.fila.push(resolve); // FIFO queue
    });
  }

  release(): void {
    if (this.fila.length > 0) {
      const proximo = this.fila.shift();
      proximo!();
    } else {
      this.contador++;
    }
  }
}
```

**Vantagens:**

- ✅ Previne deadlock com timeout assimétrico (Filósofo 5 inverte ordem)
- ✅ Semáforo FIFO garante justiça
- ✅ Detecta e libera garfos órfãos

**Desvantagens:**

- ⚠️ Timeout de 2s pode gerar starvation
- ⚠️ Race condition entre timeout e aquisição background

---

### **3. Monitores (Padrão Alto-Nível)**

**Monitor.tsx:**

```typescript
class Monitor {
  private mutex: boolean = false;
  private waitQueue: Array<() => void> = [];
  private conditionVars: Map<string, Array<() => void>> = new Map();

  async acquire(): Promise<void> {
    while (this.mutex) {
      await new Promise((resolve) => this.waitQueue.push(resolve));
    }
    this.mutex = true;
  }

  release(): void {
    this.mutex = false;
    const next = this.waitQueue.shift();
    if (next) next();
  }
}
```

**Vantagens:**

- ✅ Sincronização encapsulada
- ✅ Impossível esquecer release (try/finally)
- ✅ Garfos órfãos IMPOSSÍVEIS por design
- ✅ Menor risco de deadlock/starvation

**Desvantagens:**

- ⚠️ Mais complexo de implementar
- ⚠️ Overhead de context switching

---

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar desenvolvimento
npm run dev

# Abrir no navegador
open http://localhost:3000
```

**Monitor com Console:**

```bash
# Abrir DevTools (F12) → Console
# Você verá os logs de cada simulação com CLOCK counter
```

---

## 📈 Comparação

| Critério          | Default    | Semáforo     | Monitor       |
| ----------------- | ---------- | ------------ | ------------- |
| **Deadlock**      | 🔴 Alto    | 🟢 Resolvido | 🟢 Resolvido  |
| **Starvation**    | 🔴 Alto    | 🟡 Possível  | 🟢 Improvável |
| **Garfos Órfãos** | 🔴 Sim     | 🟢 Detectado | 🟢 Impossível |
| **Complexidade**  | 🟢 Simples | 🟡 Médio     | 🟡 Alto       |
| **Segurança**     | ❌ Não     | ✅ Sim       | ✅ Sim        |

---

## 🎓 Conclusão

- **Default**: Mostra o caos sem sincronização
- **Semáforo**: Funciona, mas requer cuidado manual
- **Monitor**: Mais seguro e elegante para produção

---

**Criado para:** Avaliação Parcial - Sistemas Distribuídos  
**Linguagem:** TypeScript + React  
**Framework:** Next.js 14
