const express = require('express')
const app = express()

app.use("/", (req, res, next) => {
  console.log("this will always run...")
  next()
})

app.use("/users", (req, res, next) => {
  res.send("<h1>This is where we get new users...</h1>")
})

app.use("/", (req, res, next) => {
  res.send("<h1>This is the root path!</h1>")
})

app.listen(3000)