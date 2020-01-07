const mongoose = require('mongoose');
const express = require('express');
const app = express() ;
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use('/',router);
const authRoutes = require('./server/routes/auth.routes');
const adminRoutes = require('./server/routes/admin.routes')
router.use('/auth' , authRoutes);
router.use('/api', adminRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/company',{
    useNewUrlParser:true ,
    useUnifiedTopology: true
})
const connection = mongoose.connection ;

connection.once('open',function(){
    console.log('connected successfully');
})

app.listen('3600',function(){
    console.log("connection established")
});