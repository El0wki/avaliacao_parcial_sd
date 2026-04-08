import Mesa from "./components/Mesa";
import { NUM_FILOSOFOS } from "./config";

export default function Home() {
  return (
    <main className="h-screen bg-gray-900">
      <div
        id="table"
        className="flex place-content-center place-items-center h-screen">
        <Mesa NUM_FILOSOFOS={NUM_FILOSOFOS} />
      </div>
    </main>
  );
}
