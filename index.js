const express = require('express');
const app = express();
const firebase = require("./db/firebase");
const {reservations} = require('./routes/reservations');

app.use(express.json());
app.use('/reservations', reservations);

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Server listening in port: ${process.env.PORT || 8080}`)
})