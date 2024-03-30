process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { searchForWorkspaceRoot } from "vite";

const app = express();

app.use(express.json());

app.use(cors());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
// const messages = [welcomeMessage];
//////////////////////////functions/////////////////////////

/////////finding Max Id in the Objects

const maxIdPlusOne = (arr) => {
  if (arr.length != 0) {
    const maxId = arr[arr.length - 1].id;
    return maxId + 1;
  } else {
    return 0;
  }
};

// finding the object contains a msg accroding to its id
const findMessageById = (arr, msgId) => {
  return arr.filter((obj) => obj.id === Number(msgId));
};

// searches for a specific msg according to the id
const serachInMessages = (arr, word) => {
  const msgs = arr.filter((object) => {
    return object.text.toLowerCase().includes(word.toLowerCase());
  });
  return msgs;
};

// getting latest 10 msg from all the msg
const latestTenMsg = (arr) => {
  const arrayOfTen = [];
  if (arr.length >= 10) {
    for (let i = arr.length - 1; i >= arr.length - 10; i--) {
      arrayOfTen.push(arr[i]);
    }
  } else {
    for (let i = arr.length - 1; i >= 0; i--) {
      arrayOfTen.push(arr[i]);
    }
  }
  return arrayOfTen;
};
//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
////////////////////////////////////////////////////////
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

const usersChat = [
  {
    from: "Behrouz",
    text: "hello",
    id: 1,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },
  {
    from: "Behrouz",
    text: "world",
    id: 3,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },

  {
    from: "Behrouz",
    text: "a",
    id: 7,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },
  {
    from: "Behrouz_k",
    text: "b",
    id: 2,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },
  {
    from: "Behrouz_k",
    text: "c",
    id: 4,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },
  {
    from: "Behrouz_k",
    text: "d",
    id: 5,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },
  {
    from: "Behrouz",
    text: "hello world",
    id: 8,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },
  {
    from: "Behrouz",
    text: "my name is B",
    id: 8,
    sentTime: "11:36:18",
    sentDate: "6/3/2024",
  },
];

const rejectTheRequest = (obj) => {
  return obj.from === "" || obj.text === "" ? true : false;
};

app.post("/messages", (req, res) => {
  const chatData = req.body;
  // adding Id to the object of the chat
  chatData.id = maxIdPlusOne(usersChat);
  // adding a timestamp
  const date = new Date();
  const sentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const sentDate = `${date.getDay()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  chatData["sentTime"] = sentTime;
  chatData["sentDate"] = sentDate;

  if (rejectTheRequest(chatData)) {
    res.status(400).json({ error: "Fill All the field!" });
  } else {
    usersChat.push(chatData);
    res.send(chatData);
  }
});

app.get("/messages", (req, res) => {
  res.send(usersChat);
});

app.get("/messages/search", (req, res) => {
  const textForSearch = req.query.text;
  // console.log(req.query);
  const msgIncludesWord = serachInMessages(usersChat, textForSearch);
  //console.log(msgIncludesWord);
  res.status(200).send(msgIncludesWord);
});

app.get("/messages/latest", (req, res) => {
  console.log(usersChat);
  const latestMsgs = latestTenMsg(usersChat);
  console.log(usersChat);
  res.status(200).send(latestMsgs);
});

app.get("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  console.log(msgId);
  const findedMsg = findMessageById(usersChat, msgId);
  res.send(findedMsg);
});

app.delete("/messages/:id", (req, res) => {
  const msgId = req.params.id;
  const findedMsg = findMessageById(usersChat, msgId);
  if (findedMsg.length > 0) {
    const index = usersChat.indexOf(findedMsg[0]);
    usersChat.splice(index, 1);
    res.send("Message deleted succesfully");
  } else {
    res.status(404).send("Message didn't find!");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});
