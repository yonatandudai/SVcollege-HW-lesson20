import { Transaction } from '../types'
import { useContext, useState } from 'react'
import { TransactionsContext } from '../contexts/TransanctionsContext'
import { useEffect } from 'react'

type Props = {
  transaction: Transaction
}

export default function TransactionComp({ transaction }: Props) {
    const { setTransactions } = useContext(TransactionsContext) || {};
    const index = transaction.id
    const [isEditing, setIsEditing] = useState(false)

    // Local form states
    const [editedDescription, setEditedDescription] = useState(transaction.description)
    const [editedAmount, setEditedAmount] = useState(transaction.amount.toString())
    const [editedDate, setEditedDate] = useState(transaction.date.toISOString().split('T')[0]) // format yyyy-mm-dd

    const handleSave = () => {
        const updatedTransaction: Transaction = {
        ...transaction,
        description: editedDescription,
        amount: parseFloat(editedAmount),
        date: new Date(editedDate),
        }

    setTransactions?.((prev: Transaction[]) => {
        return prev.map((t) => (t.id === index ? updatedTransaction : t));
    })


    setIsEditing(false);
    }

    useEffect(() => {
        setEditedDescription(transaction.description);
        setEditedAmount(transaction.amount.toString());
        setEditedDate(transaction.date.toISOString().split('T')[0]);
      }, [transaction]);

    
    const handleDelete = () => {
        setTransactions?.((prev: Transaction[]) =>
            prev.filter((t) => t.id !== index)
        );
    };

    return (
        <div className="flex flex-col items-center justify-start w-full max-w-4xl p-2 bg-white shadow-md rounded-md mb-4">
        {isEditing ? (
            <>
            <input
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="text-xl font-bold p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="text-xl font-bold p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <div className="w-full flex justify-around items-center mb-2">
                <button
                onClick={handleSave}
                className="text-lg text-green-600 font-bold"
                >
                save
                </button>
                <button
                onClick={() => setIsEditing(false)}
                className="text-lg text-gray-500 font-bold"
                >
                cancel
                </button>
            </div>
            </>
        ) : (
            <>
            <div className="w-full rounded-md flex justify-between items-center">
                <p className="text-2xl font-bold">{transaction.description}</p>
                <p className="text-2xl font-bold text-gray-700">${transaction.amount}</p>
            </div>
            <div className="w-full flex justify-around items-center mb-2">
                <h1 className="text-lg text-amber-600 ">{transaction.TransactionType}</h1>
                <h1 className="text-lg text-amber-600 ">{transaction.category}</h1>
                <h1 className="text-lg text-amber-600 ">
                {new Date(transaction.date).toLocaleDateString()}
                </h1>
            </div>
            <div className="w-full flex justify-around items-center mb-2">
                <h1
                className="text-lg text-blue-500 cursor-pointer"
                onClick={() => setIsEditing(true)}
                >
                Edit
                </h1>
                <h1
                className="text-lg text-red-500 cursor-pointer"
                onClick={()=>handleDelete()}
                >
                Delete
                </h1>
            </div>
            </>
        )}
        </div>
    )
}
