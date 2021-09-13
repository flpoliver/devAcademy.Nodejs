const http = require('http');

const routes = require('./routes');

const server = http.createServer((req, res) => {
  console.log(`Request method: ${req.method} | Endpoint: ${req.url}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === req.url && routeObj.method === req.method
  ));

  if (route) {
    route.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`Cannot ${req.method} ${req.url}`);
  }


  /*if (req.url === '/users' && req.method === 'GET') {
    UserController.listUsers(req, res);
  } else {

  }*/


});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));