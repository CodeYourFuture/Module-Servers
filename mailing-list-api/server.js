import express from "express"
import staff from "./mailing-lists.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}...`))

app.get("/", (req, res) => res.send("Hello World!"))
app.get("/staff", (req, res) => res.send(staff))