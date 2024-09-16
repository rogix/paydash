import React from "react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max grid grid-cols-4 gap-4">
        <div className="font-bold">Transaction ID</div>
        <div className="font-bold">Date</div>
        <div className="font-bold">Description</div>
        <div className="font-bold">Amount (USD)</div>
        {transactions.map((tx) => (
          <React.Fragment key={tx.id}>
            <div className="py-2">{tx.id}</div>
            <div className="py-2">{tx.date}</div>
            <div className="py-2">{tx.description}</div>
            <div className="py-2">{tx.amount.toFixed(2)}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
