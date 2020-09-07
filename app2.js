const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
const url = req.url
const method = req.method

if(url === '/') {
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<header><title>My First Page</title></header>')
  res.write('<h1>Enter Your First Name</h1>')
  res.write('<body><form action="/create-users" method="POST"><input type="text" name="message"><button type="submit">Enter Name</button></form></body>')
  res.write('</html>')
  res.end()
}

if(url === '/users') {
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<header><title>USERS</title></header>')
  res.write('<h1>Enter Your First Name></h1>')
  res.write('<body><ul><li>Bill</li><li>Jill</li></ul></body>')
  res.write('</html>')
  return res.end()
}

if (url === "/create-users" && method === "POST") {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  return req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    const message = parsedBody.split('=')[1]
    fs.writeFile(`${message}.txt`, message, err => {
      res.statusCode = 302
      res.setHeader('Location', '/')
      return res.end()
    })
  })
}

})

server.listen(3000)