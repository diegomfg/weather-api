const request = require("request");
const restify = require("restify");
const server = restify.createServer();
const bodyParser = require("body-parser");
const port = process.env.port || 9000;

let darkskyUrl =
  "https://api.darksky.net/forecast/5f92cde30212ee856099ea49f362a583/";

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const makeRequest = url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
};
// https://api.darksky.net/forecast/5f92cde30212ee856099ea49f362a583/47.5,-120.5

server.get("/api/weather/:lat/:long", async function(req, res, next) {
  const { lat, long } = req.params;
  const config = { lat: parseFloat(lat), long: parseFloat(long) };
  const url = darkskyUrl + config.lat + "," + config.long;
  try {
    let response = await makeRequest(url);
    response = JSON.parse(response, null, 2);
    res.send(response.currently);
    next();
  } catch (error) {
    res.send({ error: error.message });
  }
});

server.listen(port, () => {
  console.log(`Restify server running at port ${port}`);
});
