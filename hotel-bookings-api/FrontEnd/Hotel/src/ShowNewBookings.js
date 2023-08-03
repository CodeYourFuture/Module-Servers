import { useEffect, useState } from "react";
import NewBookings from "./Bookings";
import Delete from "./Delete";

const ShowNewBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("https://hotel-bookings-server.onrender.com/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })

  }, []);

  const handleNewBooking = (newBooking) => {
    setBookings((prevBookins) => [...prevBookins, newBooking]);
  };

  return (
    <div>
      <NewBookings props={handleNewBooking} />
      <h2>Latest Bookings</h2>
      <ul>
        {bookings.map((booking) => {
          return (
            <li key={booking.id}>
              <p>Title:{booking.title}</p>
              <p>FirstName:{booking.firstName}</p>
              <p>Surname:{booking.surname}</p>
              <p>Email:{booking.email}</p>
              <p>Room Id:{booking.roomId}</p>
              <p>check-in-Date:{booking.checkInDate}</p>
              <p>Check-Out-Date{booking.checkOutDate}</p>
              <Delete  deleteBookings={booking.id}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowNewBookings;
