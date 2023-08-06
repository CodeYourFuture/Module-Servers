import { useState } from "react";

function NewBookings({ props }) {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handletitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handlesurNameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleRoomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const handlecheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };
  const handlecheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const newBooking = {
    title,
    firstName,
    surname,
    email,
    roomId,
    checkInDate,
    checkOutDate,
  };

 
    fetch("https://hotel-bookings-server.onrender.com/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    props(data);
    setTitle("");
    setFirstName("");
    setSurname("");
    setEmail("");
    setCheckInDate("");
   setCheckOutDate("");
   })
    
 

  return (
    <form className="form">
      <div>
        <label className="label">
          Title
          <input
            className="input"
            type="text"
            value={title}
            onChange={handletitleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="label">
          First Name:
          <input
            className="input"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="label">
          Surname:
          <input
            className="input"
            type="text"
            value={surname}
            onChange={handlesurNameChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="label">
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="label">
          Room Id:
          <input
            className="input"
            type="number"
            value={roomId}
            onChange={handleRoomIdChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="label">
          Check-In-Date:
          <input
            className="input"
            type="date"
            value={checkInDate}
            onChange={handlecheckInDateChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="label">
          Check-Out-Date:
          <input
            className="input"
            type="date"
            value={checkOutDate}
            onChange={handlecheckOutDateChange}
            required
          />
        </label>
      </div>
      <div>
         <button  type="submit">Submit</button> 
      </div>
    </form>
  );
}

export default NewBookings;
