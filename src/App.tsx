import Transactions from './components/Transactions'
import TransactionsProvider from './contexts/TransanctionsContext'

function App() {

  return (
    <TransactionsProvider>
    <Transactions />
    </TransactionsProvider>
  )
}

export default App
