const express = require('express');
const app = express();
app.use(express.json());

let invoices = [];

// Get all invoices
app.get('/invoices', (req, res) => {
  res.json(invoices);
});

// Create a new invoice
app.post('/invoices', (req, res) => {
  const { customer, amount } = req.body;
  const newInvoice = {
    id: invoices.length + 1,
    customer,
    amount
  };
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// Get a specific invoice by ID
app.get('/invoices/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const invoice = invoices.find(inv => inv.id === id);
  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

// Update an existing invoice
app.put('/invoices/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { customer, amount } = req.body;
  const invoice = invoices.find(inv => inv.id === id);
  if (invoice) {
    invoice.customer = customer;
    invoice.amount = amount;
    res.json(invoice);
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

// Delete an invoice
app.delete('/invoices/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = invoices.findIndex(inv => inv.id === id);
  if (index !== -1) {
    invoices.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Invoice app backend is running on port 3000');
});
