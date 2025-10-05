const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const cors = require('cors')
require('dotenv/config')

app.use(cors())
app.options('*',cors())

// const authJwt = 
app.use(bodyParser.json())
app.use(express.json())

const authJwt = require('./helper/jwt');


const categoryRoutes = require(`./routes/category`)
const productRoutes = require(`./routes/product`)
const userRoutes = require(`./routes/user`)
//middleware
// app.use(authJwt());
//
app.use('/uploads',express.static('uploads'))
app.use('/api/category',categoryRoutes)
app.use('/api/products',productRoutes)
app.use('/api/user',userRoutes)

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database Connection is ready...')
    app.listen(process.env.PORT,() => {
        console.log(`server running on port ${process.env.PORT}`)
    })

})
.catch((err) => {
    console.log(err);
})


