import React, { useState } from 'react';
function Item({ id, onDelete }) {
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://hotel-bookings-server.onrender.com/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        onDelete(id);
        setMessage('Item deleted successfully.');
      } else {
        setMessage('Error deleting item.');
      }
    } catch (error) {
      setMessage('Error deleting item.');
    }
  };
  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>
      <p>{message}</p>
    </div>
  );
}
export default Item;























