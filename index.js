require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ------------
// MY CODE
// ------------
app.post("/api/shorturl", function(req, res) {
  console.log(req.body);
  let url = req.body.url
  if(isURl(url)){
    let newURl = {original_url: url, short_url: tempDataID};
    tempDataID++;
    tempData.push(newURl);
    res.json(newURl)
  }else {
    res.json({error: "invalid url"})
  }
})

app.get("/api/shorturl/:short", function(req, res) {
  let pos = req.params.short
  let originalUrl = tempData[pos]
  if(originalUrl){
    res.redirect(originalUrl.original_url)
  }else {
    res.json({error: "invalid url"})
  }
})

// ----------------------------------------

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
