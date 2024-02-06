const express = require("express");
const app = express();
const dotenv = require("dotenv");

app.set("port", process.env.NODE_ENV || 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require("./routes/index");

dotenv.config();

// 또는 특정 출처의 요청만 허용
app.use(
  cors({
    origin: "https://dinnermate-node-server-0d7d5dc74685.herokuapp.com",
  })
);

// /api 로 들어오는 요청에 대한 라우터
app.use("/api", indexRouter);

app.listen(app.get("port"), () => {
  console.info("Started on port", app.get("port"));
});
