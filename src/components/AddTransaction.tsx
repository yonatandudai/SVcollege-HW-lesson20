import { useContext, useState } from 'react';
import { TransactionsContext } from '../contexts/TransanctionsContext';
import { Transaction, TransactionType, Category } from '../types';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

type Props = {};

export default function AddTransaction({}: Props) {
  const { setTransactions, transactions } = useContext(TransactionsContext) || {};
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [type, setType] = useState<TransactionType>(TransactionType.Income);
  const [category, setCategory] = useState<Category>(Category.Salary);
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setTransactions) {
      const newTransaction: Transaction = {
        id: uuidv4(), // Generate a unique ID for the transaction
        TransactionType: type,
        category,
        amount: parseFloat(amount),
        description,
        date: new Date(date),
      };
      setTransactions([...(transactions || []), newTransaction]);
      console.log('Transaction added:', newTransaction);
    }

    // Reset form state
    setType(TransactionType.Income);
    setCategory(Category.Salary);
    setAmount('');
    setDescription('');
    setDate('');
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-200 p-10">
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>

      {isFormVisible ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-start w-full p-4 bg-white shadow-md rounded-md mb-4"
        >
          <div className="w-full mb-2">
            <h3 className="text-lg font-bold mb-1">Type</h3>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value={TransactionType.Income}>Income</option>
              <option value={TransactionType.Expense}>Expense</option>
            </select>
          </div>

          <div className="w-full mb-2">
            <h3 className="text-lg font-bold mb-1">Category</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="border border-gray-300 p-2 rounded w-full"
            >
              {Object.values(Category).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-2">
            <h3 className="text-lg font-bold mb-1">Amount</h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>

          <div className="w-full mb-2">
            <h3 className="text-lg font-bold mb-1">Description</h3>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>

          <div className="w-full mb-4">
            <h3 className="text-lg font-bold mb-1">Date</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>

                <button
                type="submit"
                disabled={!amount || !description || !date}
                className={`px-4 py-2 rounded font-bold text-white ${
                    !amount || !description || !date
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 cursor-pointer'
                }`}
                >
                Add Transaction
            </button>

          <div className="w-full text-center mt-4">
            <Link to="/" className="bg-blue-500 px-4 py-2 rounded cursor-pointer text-white font-bold">
                Back to Transactions HomePage
            </Link>
            </div>
        </form>
      ) : (
        <button
          className="flex flex-col bg-blue-500 px-4 py-2 mb-8 rounded cursor-pointer text-white font-bold"
          onClick={() => setIsFormVisible(true)}
        >
          Add Transaction
        </button>
      )}
        {!isFormVisible && (
        <Link to="/" className="bg-blue-500 px-4 py-2 rounded cursor-pointer text-white font-bold mt-4">
            Back to Transactions HomePage
        </Link>)}
    </div>
  );
}
