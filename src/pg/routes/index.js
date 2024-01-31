const express = require("express");
const got = require("got");
const uuid = require("uuid").v4;
const router = express.Router();

// 테스트
// const clientId = "S2_af4543a0be4d49a98122e01ec2059a56";
// const secretKey = "9eb85607103646da9f9c02b128f2e5ee";

// 세이프바운더리
const clientId = "R2_c5abe31e532b4925b90d26a364362951";
const secretKey = "d5193cf5374e47f498d749cb82d1b880";

router.get("/", function (req, res) {
  res.render("index", {
    orderId: uuid(),
    clientId: clientId,
  });

  return res;
});

router.get("/cancel", function (req, res) {
  res.render("cancel");
});

router.post("/serverAuth", function (req, res) {
  got
    .post("https://sandbox-api.nicepay.co.kr/v1/payments/" + req.body.tid, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(clientId + ":" + secretKey).toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        amount: req.body.amount,
      },
      responseType: "json",
    })
    .then(function (response) {
      console.log(response.body);
      // 결제 비즈니스 로직 구현

      const jsonData = JSON.stringify(response.body);

      // Encode JSON data for HTML embedding
      const encodedData = encodeURIComponent(jsonData);

      // Pass the encoded data to the HTML file
      res.render("response", {
        data: encodedData,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(req.body);
});

router.post("/cancel", function (req, res) {
  got
    .post(
      "https://sandbox-api.nicepay.co.kr/v1/payments/" +
        req.body.tid +
        "/cancel",
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + secretKey).toString("base64"),
          "Content-Type": "application/json",
        },
        json: {
          amount: req.body.amount,
          reason: "test",
          orderId: uuid(),
        },
        responseType: "json",
      }
    )
    .then(function (response) {
      console.log(response.body);
      // 결제 비즈니스 로직 구현

      res.render("response", {
        resultMsg: response.body.resultMsg,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(req.body);
});

router.post("/hook", function (req, res) {
  console.log(req.body);
  if (req.body.resultCode == "0000") {
    res.status(200).send("ok");
  }
  res.status(500).send("fail");
});

module.exports = router;
