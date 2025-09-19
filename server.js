const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

app.set("port", process.env.NODE_ENV || 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require("./routes/index");

dotenv.config();

// 로컬 개발 환경을 위한 CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

// /api 로 들어오는 요청에 대한 라우터
app.use("/api", indexRouter);

app.listen(app.get("port"), () => {
  console.info("Started on port", app.get("port"));
});
