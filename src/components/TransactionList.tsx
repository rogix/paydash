import React, { useEffect, useState } from "react";
import { Transaction } from "../types";
import ReactPaginate from "react-paginate";

interface Props {
  transactions: Transaction[];
}

const itemsPerPage = 5;

const TransactionList: React.FC<Props> = ({ transactions }) => {
  const [currentItems, setCurrentItems] = useState<Transaction[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [sortKey, setSortKey] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const sortedItems = [...transactions];
    sortedItems.sort((a, b) => {
      let compare = 0;
      if (sortKey === "date") {
        compare = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortKey === "amount") {
        compare = a.amount - b.amount;
      }
      return sortOrder === "asc" ? compare : -compare;
    });
    setCurrentItems(sortedItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(transactions.length / itemsPerPage));
  }, [itemOffset, transactions, sortKey, sortOrder]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    setItemOffset(newOffset);
  };

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
          {currentItems.map((tx) => (
            <React.Fragment key={tx.id}>
              <div className="py-2">{tx.id}</div>
              <div className="py-2">{tx.date}</div>
              <div className="py-2">{tx.description}</div>
              <div className="py-2">{tx.amount.toFixed(2)}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <ReactPaginate
          onPageChange={handlePageClick}
          pageCount={pageCount}
          containerClassName={"flex space-x-2"}
          pageLinkClassName={
            "px-3 py-1 border border-gray-300 rounded hover:bg-slate-500"
          }
          previousLabel={"Prev"}
          nextLabel={"Next"}
          previousLinkClassName={
            "px-3 py-1 border border-gray-300 rounded hover:bg-slate-500"
          }
          nextLinkClassName={
            "px-3 py-1 border border-gray-300 rounded hover:bg-slate-500"
          }
          activeLinkClassName={"bg-slate-600"}
        />
      </div>
    </>
  );
};

export default TransactionList;
