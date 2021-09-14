const http = require('http');
const { URL } = require('url');

const routes = require('./routes');

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`http://localhost:3000${req.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const sliptEndpoint = pathname.split('/').filter(Boolean);

  if(sliptEndpoint.length > 1 ) {
    pathname = `/${sliptEndpoint[0]}/:id`;
    id = sliptEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === req.method
  ));


  if (route) {
    req.query = Object.fromEntries(parsedUrl.searchParams);
    req.params = { id };

    route.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`Cannot ${req.method} ${parsedUrl.pathname}`);
  }


});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));