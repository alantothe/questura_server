import db from "./mongo/connection"
import express from "express"
import routes from "./routes/index"
import { configureGoogleAuth, setupGoogleStrategy } from './plugin/google';

const app = express()
const PORT = 4000

app.use(express.json());

// set up google strategy and configure auth
setupGoogleStrategy();
configureGoogleAuth(app);

app.use("/api", routes)


db.on("connected", () => {
    console.clear();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Express server running on PORT: ${PORT}`);
    });
  });
  
