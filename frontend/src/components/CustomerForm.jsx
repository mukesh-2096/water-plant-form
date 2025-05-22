import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';


const CustomerForm = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    bottleCount: '',
    cost: '',
    paymentStatus: 'Unpaid',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get('https://water-plant-form.onrender.com/customers');
    setCustomers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      bottleCount: Number(form.bottleCount),
      cost: Number(form.cost),
    };

    if (editingId) {
      await axios.put(`https://water-plant-form.onrender.com/customers/${editingId}`, payload);
    } else {
      await axios.post('https://water-plant-form.onrender.com/customers', payload);
    }

    setForm({ name: '', bottleCount: '', cost: '', paymentStatus: 'Unpaid' });
    setEditingId(null);
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    const { name, bottleCount, cost, paymentStatus } = customer;
    setForm({ name, bottleCount, cost, paymentStatus });
    setEditingId(customer._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://water-plant-form.onrender.com/customers/${id}`);
    fetchCustomers();
  };

  return (
    <div className="container">
      <h2>Customer Entry Form</h2>

      <div className="form-group">
        <label>Customer Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>No. of Bottles</label>
        <input
          type="number"
          name="bottleCount"
          value={form.bottleCount}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Cost</label>
        <input
          type="number"
          name="cost"
          value={form.cost}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Payment Status</label>
        <select
          name="paymentStatus"
          value={form.paymentStatus}
          onChange={handleChange}
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      <button className="btn-save" onClick={handleSubmit}>
        {editingId ? 'Update' : 'Save'}
      </button>

      <h3>Customer List</h3>
      {customers.map((customer) => (
        <div className="customer-card" key={customer._id}>
          <div>
            <strong>{customer.name}</strong> <br />
            {customer.bottleCount} bottles | ₹{customer.cost} |{' '}
            {customer.paymentStatus}
          </div>
          <div>
            <button className="btn-edit" onClick={() => handleEdit(customer)}>
              Edit
            </button>
            <button
              className="btn-delete"
              onClick={() => handleDelete(customer._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerForm;
