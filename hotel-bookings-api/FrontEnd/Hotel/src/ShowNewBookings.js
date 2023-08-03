import {useEffect, useState} from "react";
import NewBookings from "./Bookings";

const ShowNewBookings  = () => {
    const [bookings,setBookings] = useState([]);



    useEffect(() =>{
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

  return( 
    <div>
    <h2>Latest Bookings</h2>
    <ul>
        {bookings.map((booking) =>{
            return(
                <li key ={booking.id}>
                {booking.title}
                {booking.firstName}
                {booking.surname}
                {booking.email}
                {booking.roomId}
                {booking.checkInDate}
                {booking.checkOutDate}
                </li>
            )
        }
        )}
    </ul>
   
    <NewBookings props = {handleNewBooking} />
    </div>

  )
    }

export default ShowNewBookings;
    
