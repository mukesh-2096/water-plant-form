const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create customer' });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ timestamp: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update customer' });
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;
