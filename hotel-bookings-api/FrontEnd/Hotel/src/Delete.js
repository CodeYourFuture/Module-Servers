import React from "react";

function DeleteBookingButton({ bookingId, onDelete }) {
  const handleDelete = () => {
    fetch(`https://hotel-bookings-server.onrender.com/bookings/${bookingId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        onDelete(bookingId);
      }
    });
    console.log({ bookingId });
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteBookingButton;
