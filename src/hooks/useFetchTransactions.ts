import { useState, useEffect } from "react";
import { Transaction } from "../types";
import { fetchTransactions } from "../api";

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [setError]);

  return { transactions, error, loading };
};

export default useFetchTransactions;