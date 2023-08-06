import { useEffect, useState } from "react";
import NewBookings from "./Bookings";
import DeleteBookingButton from "./Delete";



const ShowNewBookings = () => {
  const [bookings, setBookings] = useState([]);
 



  useEffect(() => {
    fetch("https://hotel-bookings-server.onrender.com/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleNewBooking = (newBooking) => {
    setBookings((prevBookins) => [...prevBookins, newBooking]);
  };

   const handleDeleteBooking = (id) => {
     setBookings((prevBookins) =>
       prevBookins.filter((booking) => booking.id !== id)
     );
   };

   

  return (
    <div>
      <NewBookings props={handleNewBooking} />
      <h2>Latest Bookings</h2>{
        
      }
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
              <DeleteBookingButton bookingId={booking.id} onDelete={handleDeleteBooking} />
          </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowNewBookings;
