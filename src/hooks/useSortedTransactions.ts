import { useMemo } from "react";
import { Transaction } from "../types";

const useSortedTransactions = (
  transactions: Transaction[],
  sortKey: string,
  sortOrder: "asc" | "desc"
) => {
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      let compareValue = 0;
      if (sortKey === "date") {
        compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortKey === "amount") {
        compareValue = a.amount - b.amount;
      }
      return sortOrder === "asc" ? compareValue : -compareValue;
    });
  }, [transactions, sortKey, sortOrder]);

  return sortedTransactions;
};

export default useSortedTransactions;