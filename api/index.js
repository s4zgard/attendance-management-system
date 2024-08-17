import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 5001;
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(notFound);
app.use(errorHandler);

app.use("/", (req, res) => res.send(`API is running ...`));

app.listen(port, () => console.log(`Server is running on port ${port}`));
