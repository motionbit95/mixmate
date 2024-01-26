var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");

var indexRouter = require("./routes/index");

var app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "https://dinnermate.kr",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.post("/api/postData", (req, res) => {
  const dataReceived = req.body;
  console.log("Received data:", dataReceived);

  // 여기서 데이터를 처리하거나 다른 작업을 수행할 수 있습니다.
  // 결제 REQ DATA
  const current_dt = getCurrentDate();
  const order_id = init_orderid();
  const sign_data = make_sign_data(SITE_CODE + "^HAS^" + current_dt);
  const cert_info = get_cert_info();
  // console.log(current_dt, order_id, sign_data);

  const req_data = {
    site_cd: SITE_CODE,
    kcp_cert_info: cert_info,
    ordr_idxx: order_id,
    ct_type: "HAS",
    web_siteid: WEB_CODE,
    make_req_dt: current_dt,
    kcp_sign_data: sign_data,
  };

  // 해쉬 생성 API URL
  // 개발 : https://stg-spl.kcp.co.kr/std/certpass
  // 운영 : https://spl.kcp.co.kr/std/certpass
  fetch("https://spl.kcp.co.kr/std/certpass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req_data),
  })
    .then((response) => {
      // 응답 데이터를 JSON으로 변환
      return response.json();
    })
    .then((data) => {
      // 변환된 JSON 데이터 사용
      console.log(data.up_hash);
      console.log("POST 성공:", data);
    })
    .catch((error) => {
      console.error("POST 오류:", error);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

function getCurrentDate() {
  var date = new Date();
  var str_year = date.getFullYear().toString();
  var year = str_year.substr(2, 4);

  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month.toString() : month.toString();

  var day = date.getDate();
  day = day < 10 ? "0" + day.toString() : day.toString();

  var hour = date.getHours();
  hour = hour < 10 ? "0" + hour.toString() : hour.toString();

  var minites = date.getMinutes();
  minites = minites < 10 ? "0" + minites.toString() : minites.toString();

  var seconds = date.getSeconds();
  seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  var vtime = year + month + day + hour + minites + seconds;

  return vtime;
}

function init_orderid() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  var time = today.getTime();

  if (parseInt(month) < 10) {
    month = "0" + month;
  }

  var vOrderID = year + "" + month + "" + date + "" + time;

  return vOrderID;
}

// 서명데이터 생성 예제
function make_sign_data(data) {
  // 개인키 경로
  const filePath = "../kcp/certificate/KCP_AUTH_AJZLF_PRIKEY.pem";
  // 현재 스크립트가 위치한 디렉토리를 기준으로 상대경로를 절대경로로 변환
  const absoluteFilePath = path.resolve(__dirname, filePath);

  // 개인 키 파일 읽기
  const privateKey = fs.readFileSync(absoluteFilePath, "utf8");

  // 서명 생성
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(data);
  const signature = sign.sign(
    { format: "pem", key: privateKey, passphrase: "wlsghks2@!" },
    "base64"
  );

  return signature;
}

function get_cert_info() {
  // 개인키 경로
  const filePath = "../kcp/certificate/KCP_AUTH_AJZLF_CERT.pem";
  // 현재 스크립트가 위치한 디렉토리를 기준으로 상대경로를 절대경로로 변환
  const absoluteFilePath = path.resolve(__dirname, filePath);

  const STX = "-----BEGIN CERTIFICATE-----";
  const ETX = "-----END CERTIFICATE-----";
  // 개인 키 파일 읽기
  const cert_info = fs
    .readFileSync(absoluteFilePath, "utf8")
    .toString()
    .replace(STX, "")
    .replace(ETX, "")
    .replace(/(\s*)/g, "");

  return STX + cert_info + ETX;
}

const SITE_CODE = "AJZLF";
const WEB_CODE = "J24012610119";
const SIGN_DATA =
  "cc533530bb4f466456e05b89f5142e2ec7ed37982f82802a44782d8f0c14f5f8";
// 테스트용 인증서정보(직렬화)
const TEST_CERT_INFO =
  "-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----";

module.exports = app;
