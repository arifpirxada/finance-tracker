import './App.css'
import Layout from './layout/Layout'
import Router from './routes/Router'

function App() {
  return (
    <>
      <Layout children={ <Router /> } />
    </>
  )
}

export default App
