const express = require('express')
const planeRouter = require('./routes/planes.routes')
const cors = require('cors')

const PORT = process.env.PORT || 8080


const app = express()

const corsOptions = {
  origin: "*"
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api', planeRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


