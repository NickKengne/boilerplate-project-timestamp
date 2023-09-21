// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get('/api/:id', (req,res) => {
  function formatDateToCustomString(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const dayOfMonth = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
  }
  
  
  const {id} = req.params
  const  idTimeStamp = new Date(id)
  const date = new Date(id);
  const dateFormatee = formatDateToCustomString(date);

    res.json(
      {
        "unix": idTimeStamp.getTime(),
        "utc": dateFormatee
      }
    )
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
