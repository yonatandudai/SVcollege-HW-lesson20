
import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransanctionsContext'
import { TransactionType } from '../types'

type Props = {}

export default function Expenses({}: Props) {
    const { transactions = [] } = useContext(TransactionsContext) || {};

    const expenseByCategory = transactions
    .filter((t) => t.TransactionType === TransactionType.Expense)
    .reduce((acc: { [key: string]: number }, t) => {
      const category = t.category as string
      acc[category] = (acc[category] || 0) + t.amount
      return acc
    }, {});
    

    return (
        <div>
          <h1 className="text-2xl font-bold mb-6">Expenses By Category</h1>
          <div className="flex flex-col items-center justify-start w-full max-w-4xl mb-6">
            {Object.entries(expenseByCategory).map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between w-full p-2 bg-white shadow-md rounded-md mb-4"
              >
                <h1 className="text-xl font-bold">{category}</h1>
                <h1 className="text-xl font-bold">${amount.toFixed(2)}</h1>
              </div>
            ))}
          </div>
        </div>
      )
    }