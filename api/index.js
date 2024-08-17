import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 5001;

app.use(express.json());

app.use("/", (req, res) => res.send(`API is running ...`));

app.listen(port, () => console.log(`Server is running on port ${port}`));
