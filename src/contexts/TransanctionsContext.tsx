import { createContext } from 'react'
import { Transaction } from '../types'
import { TransactionType } from '../types'
import { Category } from '../types'
import { useState } from 'react'
import { ReactNode } from 'react'

export const TransactionsContext = createContext<{
  transactions: Transaction[];
  setTransactions: Function
} | undefined>(undefined);

const exampleTransactions: Transaction[] = [
  {
    id: '1',
    TransactionType: TransactionType.Income,
    category: Category.Salary,
    amount: 4500,
    description: 'Monthly salary for March',
    date: new Date('2025-03-01'),
  },
  {
    id: '2',
    TransactionType: TransactionType.Expense,
    category: Category.Rent,
    amount: 1200,
    description: 'March apartment rent',
    date: new Date('2025-03-03'),
  },
  {
    id: '3',
    TransactionType: TransactionType.Expense,
    category: Category.Food,
    amount: 200,
    description: 'Groceries from supermarket',
    date: new Date('2025-03-05'),
  },
  {
    id: '4',
    TransactionType: TransactionType.Expense,
    category: Category.Entertainment,
    amount: 100,
    description: 'Movie night with friends',
    date: new Date('2025-03-06'),
  },
  {
    id: '5',
    TransactionType: TransactionType.Expense,
    category: Category.Shopping,
    amount: 180,
    description: 'New running shoes',
    date: new Date('2025-03-08'),
  },
  {
    id: '6',
    TransactionType: TransactionType.Income,
    category: Category.Salary,
    amount: 300,
    description: 'Freelance web design project',
    date: new Date('2025-03-10'),
  },
  {
    id: '7',
    TransactionType: TransactionType.Expense,
    category: Category.Travel,
    amount: 600,
    description: 'Weekend getaway trip',
    date: new Date('2025-03-11'),
  },
  {
    id: '8',
    TransactionType: TransactionType.Expense,
    category: Category.Food,
    amount: 40,
    description: 'Dinner at local restaurant',
    date: new Date('2025-03-12'),
  },
  {
    id: '9',
    TransactionType: TransactionType.Expense,
    category: Category.Entertainment,
    amount: 20,
    description: 'Spotify monthly subscription',
    date: new Date('2025-03-13'),
  },
  {
    id: '10',
    TransactionType: TransactionType.Expense,
    category: Category.Shopping,
    amount: 110,
    description: 'Clothes shopping online',
    date: new Date('2025-03-15'),
  },
];

export default function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(exampleTransactions);


  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>  
            {children}
    </TransactionsContext.Provider>
  )
}