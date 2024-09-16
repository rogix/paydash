import { transactions } from './mockData';
import { Transaction } from './types';

export const fetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;
      if (shouldFail) {
        reject(new Error('Failed to fetch transactions.'));
      } else {
        resolve(transactions);
      }
    }, 1000); 
  });
};