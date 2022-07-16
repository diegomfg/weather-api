const restify = require("restify");
const axios = require('axios').default;
const server = restify.createServer();
const bodyParser = require("body-parser");
const cors = require('cors');
const port = process.env.port || 9000;

let darkskyUrl =
  "https://api.darksky.net/forecast/5f92cde30212ee856099ea49f362a583/";

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// https://api.darksky.net/forecast/5f92cde30212ee856099ea49f362a583/47.5,-120.5

server.get("/api/weather/:lat/:long", async function(req, res, next) {
  const { lat, long } = req.params;
  const config = { lat: parseFloat(lat), long: parseFloat(long) };
  const url = darkskyUrl + config.lat + "," + config.long;

  try {
    
    let response = await axios.get(url);
    console.log(response.data.currently)
    return res.json(response.data.currently);
  } catch (error) {
    return next(error);
  }
});

server.get("*", (req, res) => {
  res.write("<pre>All requests are made to /api/weather/:lat/:long</pre>");
});

server.on('error', (req, res, error, callback) => {
  if(error){
    console.log("Exception handler");
    return res.send({message: error.message})
  }
  callback()
})

server.listen(port, () => {
  console.log(`Restify server running at port ${port}`);
});
