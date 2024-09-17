import { useState, useEffect, useCallback } from "react";
import { Transaction } from "../types";

const useFilteredTransactions = (transactions: Transaction[], startDate: Date | null, endDate: Date | null) => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const filterTransactions = useCallback(() => {
    let filtered = transactions;

    if (startDate) {
      filtered = filtered.filter((tx) => new Date(tx.date) >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((tx) => new Date(tx.date) <= endDate);
    }

    setFilteredTransactions(filtered);
  }, [transactions, startDate, endDate]);

  useEffect(() => {
    filterTransactions();
  }, [startDate, endDate, transactions, filterTransactions]);

  return { filteredTransactions, error, setError };
};

export default useFilteredTransactions;