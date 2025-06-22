import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
app.use(cors(corsOptions));


app.use(express.json({ extended: false, limit: '3000kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1", routes);

app.use(async (error, res, next) => {
  next(new Error("This route does not exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.messaage,
    },
  });
});

export default app;