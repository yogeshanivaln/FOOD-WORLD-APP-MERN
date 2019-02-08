const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/login',{useNewUrlParser:true})
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 5000;

app.use('/user',userRoutes);
app.use('/item',itemRoutes);

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authoriuzation ');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','POST,PATCH,PUT,DELETE,GET');
        res.status(200).json({});
    }
    next();
})

app.listen(PORT,console.log("Running at port 5000"));