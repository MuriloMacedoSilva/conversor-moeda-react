
import { CirclePoundSterling } from "lucide-react";
import { useState } from "react";

function App() {
  const [valor, setValor] = useState("");
  const [moeda, setMoeda] = useState("BRL");
  const [moedaFinal, setMoedaFinal] = useState("USD");
  const [resultado, setResultado] = useState("");

  async function convertMoney(e) {
    e.preventDefault(); // evita recarregamento do formulário

    if (!valor || !moeda || !moedaFinal) return;

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${moeda}`
      );
      const data = await response.json();
      const taxa = data.rates[moedaFinal];

      if (!taxa) {
        setResultado("Moeda inválida");
        return;
      }

      const converted = valor * taxa;
      setResultado(`${converted.toFixed(2)} ${moedaFinal}`);
    } catch (error) {
      setResultado("Erro na conversão");
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-t from-sky-500 to-indigo-500">
      <form
        id="formulario"
        onSubmit={convertMoney}
        className="w-[400px] p-[25px] bg-amber-50 rounded-2xl shadow flex flex-col items-center justify-center gap-7"
      >
        <h1 className="font-bold text-2xl">Conversor de Moedas</h1>

        <div className="w-full flex gap-[10px]">
          <label className="flex flex-col w-[55%] gap-1.5 font-semibold">
            Valor
            <input
              className="border h-[45px] border-gray-400 rounded p-[3px]"
              type="number"
              placeholder="00,00"
              step={0.1}
              min={0}
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              required
            />
          </label>

          <label className="flex flex-col w-[55%] gap-1.5 font-semibold">
            De
            <select
              className="border h-[45px] w-full border-gray-400 rounded p-[3px]"
              value={moeda}
              onChange={(e) => setMoeda(e.target.value)}
            >
              {[
                "USD",
                "EUR",
                "BRL",
                "GBP",
                "JPY",
                "CAD",
                "AUD",
                "CHF",
                "CNY",
                "ARS",
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="w-full flex gap-[10px]">
          <label className="flex flex-col w-[75%] gap-1.5 font-semibold">
            Resultado
            <div className="border w-full h-[45px] border-gray-400 rounded p-[3px] flex items-center">
              <p>{resultado}</p>
            </div>
          </label>

          <label className="flex flex-col w-[55%] gap-1.5 font-semibold">
            Para
            <select
              className="border h-[45px] w-full border-gray-400 rounded p-[3px]"
              value={moedaFinal}
              onChange={(e) => setMoedaFinal(e.target.value)}
            >
              {[
                "USD",
                "EUR",
                "BRL",
                "GBP",
                "JPY",
                "CAD",
                "AUD",
                "CHF",
                "CNY",
                "ARS",
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center h-[50px] cursor-pointer hover:bg-fuchsia-800 transition duration-100 w-full bg-fuchsia-950 text-amber-50 font-semibold text-[16px] rounded p-[5px]"
        >
          <CirclePoundSterling className="text-amber-400 mr-2" />
          Converter Moeda
        </button>
      </form>
    </div>
  );
}

export default App;
