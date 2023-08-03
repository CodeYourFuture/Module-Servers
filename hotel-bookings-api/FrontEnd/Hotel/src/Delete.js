const Delete = ({deleteBookings}) =>{
    const deleteBooking = () =>{
        fetch("https://hotel-bookings-server.onrender.com/bookings/" + deleteBookings,{
            method:"DELETE",
    }).then((res) => res.json()
    .then ((data) => console.log(data))
   
        
    )}
    return(
        <button onClick = {deleteBooking}>Delete</button>
    )
        }
  
    export default Delete ;
