const fs = require('fs')

const requestHandler = (req, res) => {
  const method = req.method
  const url = req.url;

if(url === '/') {
  res.write('<html>')
  res.write('<header><title>Enter Message</title></header>')
  res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></form></body>')
  res.write('</html>')
  return res.end()
}

if (url === "/message" && method === "POST") {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  return req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    const message = parsedBody.split('=')[1]
    fs.writeFile('message.txt', message, err => {
      res.statusCode = 302
      res.setHeader('Location', '/')
      return res.end()
    })
  })
}

res.setHeader('Content-Type', 'text/html')
res.write('<html>')
res.write('<header><title>My First Page</title></header>')
res.write('<body><h1>Hello, welcome to my Node.js Server</h1></body>')
res.write('</html>')
res.end()
}


module.exports = requestHandler