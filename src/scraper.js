const express = require("express");
const fs = require('fs');
const GetData = require("./router/router");
const app = express();

app.use(express.json());

// POST route for scrapper
app.post("", async (req, res) => {
  const { jobtype = "", location = "" } = req.body;

  //Getting data from router.js
  const data = await GetData(req.body);

  //creating a JSON file with query as name and current time

  const filename = `${jobtype}-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(data));

  //sending response to the request made
  res.send({data})
});

//listening at port 8080

app.listen(8080, () => {
   console.log("listening 8080");
});