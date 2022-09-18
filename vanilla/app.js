const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  const url = req.url;
  if (url === "/about") {
    res.write("about us page");
    res.end();
  } else if (url === "/contact") {
    res.write("contact us page");
    res.end();
  } else {
    res.write("Hello World!");
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
