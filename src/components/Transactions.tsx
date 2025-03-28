import { useContext } from 'react';
import TransactionComp from './TransactionComp';
import { TransactionsContext } from '../contexts/TransanctionsContext';
import { TransactionType } from '../types';
import { Link } from 'react-router-dom';

type Props = {};

export default function Transactions({}: Props) {
  const { transactions = [] } = useContext(TransactionsContext) || {};


  const totalIncome = transactions
    .filter((t) => t.TransactionType === TransactionType.Income)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.TransactionType === TransactionType.Expense)
    .reduce((acc, t) => acc + t.amount, 0);

  const total = transactions.reduce((acc, t) => {
    return t.TransactionType === TransactionType.Income
      ? acc + t.amount
      : acc - t.amount;
  }, 0);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-200">
      <h1 className="text-5xl font-bold mb-6 mt-4">Transaction Tracker</h1>
      <div className="flex flex-col items-center justify-start w-full max-w-4xl">
        {transactions
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date (descending)
          .map((transaction, index) => (
            <TransactionComp key={index} transaction={transaction} />
          ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl p-4 mt-6 mb-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold">Income: ${totalIncome}</h1>
        <h1 className="text-2xl font-bold">Expenses: ${totalExpenses}</h1>
        <h1 className="text-2xl font-bold">Total: ${total}</h1>
      </div>
      <Link to="/add-transaction" className="bg-blue-500 px-4 py-2 mb-8 rounded cursor-pointer text-white font-bold">
        Add Transaction
      </Link>
      <Link to="/expenses" className="bg-blue-500 px-4 py-2 mb-10 rounded cursor-pointer text-white font-bold">
        View Expenses by Category
      </Link>
    </div>
  );
}
