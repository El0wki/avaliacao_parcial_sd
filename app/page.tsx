import Mesa from "./components/default/Mesa";
import SemaforoMesa from "./components/semaforo/SemaforoMesa";
import MonitorMesa from "./components/monitor/MonitorMesa";
import { NUM_FILOSOFOS } from "./config";

export default function Home() {
  return (
    <main className="h-screen bg-gray-900 flex pt-100 w-max">
      <div className="flex-1 border-r border-gray-700">
        <h2 className="text-center text-white pt-4 font-bold">Default</h2>
        <Mesa NUM_FILOSOFOS={NUM_FILOSOFOS} />
      </div>
      <div className="flex-1 border-r border-gray-700">
        <h2 className="text-center text-white pt-4 font-bold">Semáforos</h2>
        <SemaforoMesa NUM_FILOSOFOS={NUM_FILOSOFOS} duracao={15000} />
      </div>
      <div className="flex-1">
        <h2 className="text-center text-white pt-4 font-bold">Monitor</h2>
        <MonitorMesa NUM_FILOSOFOS={NUM_FILOSOFOS} duracao={15000} />
      </div>
    </main>
  );
}
