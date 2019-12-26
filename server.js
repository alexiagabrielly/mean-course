const http = require('http');

const server = http.createServer((req, res) => {
  res.end('this is first response');
});


//Definindo a porta do servidor local
server.listen(process.env.PORT || 3000);
