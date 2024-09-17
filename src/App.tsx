import React, { useState } from "react";

import TransactionList from "./components/TransactionList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Header } from "./components/Header";
import useFilteredTransactions from "./hooks/useFilteredTransactions";
import useFetchTransactions from "./hooks/useFetchTransactions";

const App: React.FC = () => {
  const { transactions, error, loading } = useFetchTransactions();

  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2024-09-15")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const { filteredTransactions } = useFilteredTransactions(
    transactions,
    startDate,
    endDate
  );

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-blue-100 text-blue-700 p-4 rounded">Loading...</div>
      </div>
    );
  }

  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  return (
    <div className="container px-6 mx-auto">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Payment Transaction Dashboard</h1>
      <div>
        <div className="mb-6">
          <h5 className="text-lg font-semibold">
            Total Transactions: {totalTransactions}
          </h5>
          <h5 className="text-lg font-semibold">
            Total Amount: ${totalAmount.toFixed(2)}
          </h5>
        </div>
        <div className="flex justify-start">
          <div className="flex mb-6 max-w-96">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="mt-1 block w-full p-2 border border-none bg-[#1c1e21] rounded"
                showIcon
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="mt-1 block w-full p-2 border border-none bg-[#1c1e21] rounded"
                showIcon
              />
            </div>
          </div>
        </div>
        <main className="container rounded-lg p-5 mx-auto bg-[#26282d]">
          <TransactionList transactions={filteredTransactions} />
        </main>
      </div>
    </div>
  );
};

export default App;
