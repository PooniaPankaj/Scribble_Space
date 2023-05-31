const connectToMongo = require('./db');
const express = require('express')
connectToMongo();


const app = express()
const port = 8000
app.use(express.json());
const cors = require('cors')
app.use(cors())


app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Scribble space listening on port ${port}`)
})
