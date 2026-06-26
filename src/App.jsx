import { useState } from "react";
import { Trash2, Plus, DollarSign } from "lucide-react";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

    const newEntry = {
      id: Date.now(),
      desc: description.trim(),
      amount: parseFloat(amount),
      type: type,
    };

    setEntries([newEntry, ...entries]);
    setDescription("");
    setAmount("");
    setType("expense");
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const totalBalance = entries.reduce((acc, entry) => {
    return entry.type === "income" ? acc + entry.amount : acc - entry.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <DollarSign className="text-[#0ea5e9]" size={40} />
            Budget Tracker
          </h1>
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <div className="text-sm text-zinc-400 mb-1">Total Balance</div>
            <div
              className={`text-3xl font-bold ${
                totalBalance >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ${totalBalance.toFixed(2)}
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-800">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-zinc-300">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-zinc-300">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-zinc-300">
              Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="expense"
                  checked={type === "expense"}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4 text-[#0ea5e9] bg-zinc-800 border-zinc-600 focus:ring-[#0ea5e9] focus:ring-2"
                />
                <span className="text-white">Expense</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="income"
                  checked={type === "income"}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4 text-[#0ea5e9] bg-zinc-800 border-zinc-600 focus:ring-[#0ea5e9] focus:ring-2"
                />
                <span className="text-white">Income</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Entry
          </button>
        </form>

        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              No entries yet. Add your first transaction above.
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">{entry.desc}</div>
                  <div
                    className={`text-lg font-bold ${
                      entry.type === "income" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {entry.type === "income" ? "+" : "-"}${entry.amount.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                  aria-label="Delete entry"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}