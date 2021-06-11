const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const { User } = require("./models/User")

const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// application/json
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('``` mongoDB is connected'))
  .catch(err => console.log('``` mongoDB is not connected', err))

app.get('/', (req, res) => {
  res.send('Hello World-!')
})


app.post('/register', (req, res) => {
    console.log('``` [POST] /register, request body: ', req.body)
    // get information for signup, and save to database
    const user = new User(req.body)
    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, aaa: true, data: userInfo, err })
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
