import PaymentForm from './components/PaymentForm'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f2f1, #f1f8e9)',
        padding: '1rem', // ensures spacing on small screens
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px' // limits width on large screens
        }}
      >
        <PaymentForm />
      </div>
    </div>
  )
}

export default App
