import {useState} from "react";

function NewBookings({props}) {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("")

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

     

  

  
    const newMessage = {
      title,
      firstName,
      surname,
      email,
      roomId,
      checkInDate,
      checkOutDate
    };
 
    fetch("https://hotel-bookings-server.onrender.com/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((data) => {
       props(data)
        setTitle("");
        setFirstName("");
        setSurname("");
        setEmail("");
        setCheckInDate("");
        setCheckOutDate("");
      });
  

  return (
    <form >
      <div>
        <label className="name">
          Title
          <input
            className="title"
            type="text"
            value={title}
            onChange={handletitleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="first">
          Text:
          <input
            className=""
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="first">
          Text:
          <input
            className=""
            type="text"
            value={surname}
            onChange={handlesurNameChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="first">
          Text:
          <input
            className=""
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="first">
          Text:
          <input
            className=""
            type="text"
            value={roomId}
            onChange={handleRoomIdChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="first">
          Text:
          <input
            className=""
            type="text"
            value={checkInDate}
            onChange={handlecheckInDateChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="first">
          Text:
          <input
            className=""
            type="text"
            value={checkOutDate}
            onChange={handlecheckOutDateChange}
            required
          />
        </label>
      </div>
      <div>
        <button type = "submit">Submit</button>
      </div>
    </form>
  );
  }

export default NewBookings;
