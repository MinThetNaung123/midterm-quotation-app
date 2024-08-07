import React, { useState } from 'react';
import accessories from './accessory.json'; // Import the JSON file
import 'bootstrap-icons/font/bootstrap-icons.css'

const App = () => {
  const [rows, setRows] = useState([{ item: '', price: '', quantity: '', discount: '' }]);
  const [quotation, setQuotation] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const handleRowChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddToQuotation = () => {
    const newQuotation = rows.map(row => {
      const price = parseFloat(row.price) || 0;
      const quantity = parseInt(row.quantity) || 0;
      const discount = parseFloat(row.discount) || 0;
      const amount = (price * quantity) * (1 - discount / 100);
      return { item: row.item, quantity, price, amount: amount.toFixed(2) };
    });

    setQuotation([...quotation, ...newQuotation]);

    // Calculate total price and total items
    const total = newQuotation.reduce((acc, curr) => acc + parseFloat(curr.amount), 0) + parseFloat(totalPrice);
    const items = newQuotation.reduce((acc, curr) => acc + parseInt(curr.quantity), 0) + totalItems;
    setTotalPrice(total.toFixed(2));
    setTotalItems(items);

    // Clear input fields
    setRows([{ item: '', price: '', quantity: '', discount: '' }]);
  };

  const handleClear = () => {
    // Clear both input fields and quotation
    setRows([{ item: '', price: '', quantity: '', discount: '' }]);
    setQuotation([]);
    setTotalPrice(0);
    setTotalItems(0);
  };

  const handleRemoveItem = (index) => {
    const updatedQuotation = [...quotation];
    const removedItem = updatedQuotation.splice(index, 1)[0];
    setQuotation(updatedQuotation);

    // Recalculate total price and total items
    const total = updatedQuotation.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const items = updatedQuotation.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
    setTotalPrice(total.toFixed(2));
    setTotalItems(items);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <h4 className="text-center"></h4>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="item">Item</label>
            <select
              name="item"
              className="form-control"
              value={rows[0].item}
              onChange={(e) => handleRowChange(0, e)}
              style={{ backgroundColor: rows[0].item ? '#ffffff' : '#f8f9fa' }}
            >
              <option value="">Select an item</option>
              {accessories.map(accessory => (
                <option key={accessory.id} value={accessory.name}>
                  {accessory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price per Unit</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={rows[0].price}
              onChange={(e) => handleRowChange(0, e)}
              style={{ backgroundColor: rows[0].price ? '#ffffff' : '#f8f9fa' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity"
              value={rows[0].quantity}
              onChange={(e) => handleRowChange(0, e)}
              style={{ backgroundColor: rows[0].quantity ? '#ffffff' : '#f8f9fa' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              name="discount"
              className="form-control"
              placeholder="Discount (%)"
              value={rows[0].discount}
              onChange={(e) => handleRowChange(0, e)}
              style={{ backgroundColor: rows[0].discount ? '#ffffff' : '#f8f9fa' }}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary mb-1" onClick={handleAddToQuotation}>Add</button>
          </div>
        </div>

        <div className="col-md-6">
          <h4 className="text-center">Quotation</h4>
          <table className="table table-bordered" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotation.map((row, index) => (
                <tr key={index}>
                  <td>{row.item}</td>
                  <td>{row.quantity}</td>
                  <td>{parseFloat(row.price).toFixed(2)}</td>
                  <td>{row.amount}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(index)}>
                    <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5 className="text-center">Total Price: {totalPrice} Bath</h5>
          <div className="text-center">
            <button className="btn btn-danger mb-3" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
