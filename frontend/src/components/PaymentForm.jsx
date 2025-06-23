import { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material'

const PaymentForm = () => {
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!phone || !amount) {
      setStatus('Please fill in all fields')
      return
    }

    setLoading(true)
    setStatus('')

    try {
      const res = await axios.post('http://localhost:5000/stk-push', {
        phone,
        amount
      })
      setStatus(res.data?.ResponseDescription || 'Request sent')
    } catch (err) {
      setStatus('Payment failed or server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom color="green">
          M-Pesa Payment
        </Typography>

        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          margin="normal"
          placeholder="e.g. 254712345678"
        />

        <TextField
          fullWidth
          label="Amount"
          type="number"
          variant="outlined"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          margin="normal"
          placeholder="e.g. 100"
        />

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handlePayment}
            disabled={loading}
            sx={{ py: 1.2 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Pay Now'}
          </Button>
        </Box>

        {status && (
          <Typography mt={3} align="center" color="text.secondary" fontSize="14px">
            {status}
          </Typography>
        )}
      </Paper>
    </Container>
  )
}

export default PaymentForm
