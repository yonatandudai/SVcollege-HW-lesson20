import { BrowserRouter, Routes } from 'react-router-dom'
import Transactions from './components/Transactions'
import TransactionsProvider from './contexts/TransanctionsContext'
import { Route } from 'react-router-dom'
import AddTransaction from './components/AddTransaction'
import Expenses from './components/Expenses'

function App() {

  return (
    <TransactionsProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
      </BrowserRouter>
    </TransactionsProvider>
  )
}

export default App
