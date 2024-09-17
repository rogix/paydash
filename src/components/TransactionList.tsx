import React, { useState } from "react";
import { Transaction } from "../types";
import { Paginate } from "./Paginate";
import useSortedTransactions from "../hooks/useSortedTransactions";
import usePagination from "../hooks/usePagination";

interface Props {
  transactions: Transaction[];
}

const itemsPerPage = 5;

const TransactionList: React.FC<Props> = ({ transactions }) => {
  const [sortKey, setSortKey] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedTransactions = useSortedTransactions(
    transactions,
    sortKey,
    sortOrder
  );

  const { pageCount, currentItems, handlePageClick } = usePagination(
    sortedTransactions,
    itemsPerPage
  );

  const renderTransactionRows = (transactions: Transaction[]) =>
    transactions.map((tx) => (
      <React.Fragment key={tx.id}>
        <div className="py-2">{tx.id}</div>
        <div className="py-2">{tx.date}</div>
        <div className="py-2">{tx.description}</div>
        <div className="py-2">{tx.amount.toFixed(2)}</div>
      </React.Fragment>
    ));

  return (
    <>
      <div className="flex items-center mb-8">
        <label className="mr-2 font-medium text-white">Sort By:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="p-2 border border-gray-300 text-white bg-slate-600 rounded mr-4"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <div className="flex items-center space-x-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={() => setSortOrder("asc")}
              className="mr-1"
            />
            Ascending
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={() => setSortOrder("desc")}
              className="mr-1"
            />
            Descending
          </label>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="min-w-max grid grid-cols-4 gap-4">
          <div className="font-bold">Transaction ID</div>
          <div className="font-bold">Date</div>
          <div className="font-bold">Description</div>
          <div className="font-bold">Amount (USD)</div>
          {renderTransactionRows(currentItems)}
        </div>
      </div>
      <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
    </>
  );
};

export default TransactionList;
