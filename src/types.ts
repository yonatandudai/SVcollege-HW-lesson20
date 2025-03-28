export type Transaction = {
    id: string
    TransactionType: TransactionType
    category: Category
    amount: number
    description: string
    date: Date
    }

export enum TransactionType {
    Income = 'Income',
    Expense = 'Expense'
};

export enum Category {
    Food = 'Food',
    Entertainment = 'Entertainment',
    Rent = 'Rent',
    Shopping = 'Shopping',
    Travel = 'Travel',
    Salary = 'Salary',
};