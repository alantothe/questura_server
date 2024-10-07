import db from "./mongo/connection"
import express from "express"
import routes from "./routes/index"


const app = express()
const PORT = 4000

app.use(express.json());

app.use("/api", routes)


db.on("connected", () => {
    console.clear();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Express server running on PORT: ${PORT}`);
    });
  });
  
