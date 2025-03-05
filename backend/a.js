const https = require("https");

const apiUrl = "https://api.x.ai/v1/chat/completions";
const apiKey =
  "xai-FNyf0fMruxDiqyNrwXftQCzc25bTXdmSyryBt5lbMLonJtvkYJ2FpFLrlEPAop83bg0il7kr2hr3BVSF";

const requestData = JSON.stringify({
  messages: [
    {
      role: "system",
      content: "You are a test assistant.",
    },
    {
      role: "user",
      content: "Testing. Just say hi and hello world and nothing else.",
    },
  ],
  model: "grok-2-latest",
  stream: false,
  temperature: 0,
});

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "Content-Length": requestData.length,
  },
};

const req = https.request(apiUrl, options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log(JSON.parse(data));
  });
});

req.on("error", (error) => {
  console.error("Error:", error.message);
});

req.write(requestData);
req.end();
