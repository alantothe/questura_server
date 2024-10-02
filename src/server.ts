import express from "express"
import routes from "./routes/index"

const app = express()
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})


app.use("/api", routes)
