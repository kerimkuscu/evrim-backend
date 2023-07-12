const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


let invoices = [];

// Get all invoices
app.get('/invoices', (req, res) => {
  const formattedInvoices = invoices.map(invoice => {
    const { id, billTo } = invoice;
    const { name, email, address } = billTo;
    return {
      id,
      name,
      email,
      address
    };
  });
  res.json(formattedInvoices);
});

// Create a new invoice
app.post('/invoices', (req, res) => {
  const { billFrom, billTo, items } = req.body;

  const newInvoice = {
    id: invoices.length + 1,
    billFrom: billFrom,
    billTo: billTo,
    items
  };
  invoices.push(newInvoice);
  res.status(201).json({
    message: 'Invoice created',
    invoice: newInvoice,
  });
});

// Get a specific invoice by ID
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
  const { billFrom, billTo, items } = req.body;
  const invoice = invoices.find(inv => inv.id === id);

  if (invoice) {
    invoice.billFrom = billFrom;
    invoice.billTo = billTo
    invoice.items = items
    res.json({message: 'Invoice is updated'});
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
    res.sendStatus(204).json({message: 'Invoice is deleted'});
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Invoice app backend is running on port 3001');
});
